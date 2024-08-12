package com.chestnut.backend.log.repository;

import com.chestnut.backend.log.entity.AttendanceLog;
import com.chestnut.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AttendanceLogRepository extends JpaRepository<AttendanceLog, Long> {

    @Query("select al.attendanceCount from AttendanceLog al " +
            "where al.attendanceAt between :start and :end " +
            "and al.member = :member")
    Optional<Short> findYesterdayLog(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end, @Param("member")Member member);

    /**
     * 출석 기록을 조회.
     *
     * @param memberId 출석 조회할 멤버 Id
     * @param year 조회할 년도
     * @return List<LocalDate> 출석한 날짜 목록
     */
    @Query("""
            SELECT CAST(DATE(al.attendanceAt) AS java.time.LocalDate)
            FROM AttendanceLog al
            right join al.member m
            WHERE YEAR(al.attendanceAt) = :year and m.memberId=:memberId
            """)
    List<LocalDate> findByMemberIdandYear(@Param("memberId") Long memberId, @Param("year") int year);
}
