package com.chestnut.backend.log.repository;

import com.chestnut.backend.log.entity.AttendanceLog;
import com.chestnut.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface AttendanceLogRepository extends JpaRepository<AttendanceLog, Long> {

    @Query("select al.attendanceCount from AttendanceLog al " +
            "where al.attendanceAt between :start and :end " +
            "and al.member = :member")
    Optional<Short> findYesterdayLog(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end, @Param("member")Member member);

}
