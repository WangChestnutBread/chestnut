package com.chestnut.backend.attendanceLog;

import com.chestnut.backend.member.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Table(name="Attendance_log")
@Getter
public class AttendanceLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned", nullable = false)
    private Long attendanceLogId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", nullable = false)
    private Member member;

    @Column(columnDefinition = "timestamp", nullable = false)
    private LocalDateTime attendanceAt;

    @Column(columnDefinition = "smallint default 1", nullable = false)
    private int attendanceCount;

    protected AttendanceLog() {}

    @Builder
    public AttendanceLog(
        Member member,
        LocalDateTime attendanceAt,
        int attendanceCount
    ) {
        this.member = member;
        this.attendanceAt = attendanceAt;
        this.attendanceCount = attendanceCount;
    }
}
