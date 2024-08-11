package com.chestnut.backend.log.repository;

import com.chestnut.backend.log.entity.StudyLog;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StudyLogRepository extends JpaRepository<StudyLog, Long> {

    @Query("select sl.todayCount from StudyLog sl " +
            "where sl.member.memberId = :memberId and sl.studiedDay = current_date() " +
            "order by sl.studyLogId desc")
    List<Byte> findRecentLogByMemberId(@Param("memberId") Long memberId, Pageable pageable);

    @Query("select sl.passRecord from StudyLog sl " +
            "where sl.member.memberId = :memberId and sl.study.studyId = :studyId " +
            "order by sl.studyLogId desc")
    List<Boolean> findPassRecord(@Param("memberId") Long memberId, @Param("studyId") Long studyId, Pageable pageable);

    @Query(
            "select sl from StudyLog sl join " +
            "(select max(sl2.studyLogId) studyLogId from StudyLog sl2 where sl2.member.memberId = :memberId group by sl2.study.studyId) maxLog " +
            "on sl.studyLogId = maxLog.studyLogId"
    )
    List<StudyLog> findRecentStudyLogByMemberId(@Param("memberId") Long memberId);

}
