package com.chestnut.backend.log.entity;

import com.chestnut.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="Attendance_log")
@Getter
public class AttendanceLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned", nullable = false)
    private Long attendanceLogId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @Column(columnDefinition = "timestamp", nullable = false)
    private LocalDateTime attendanceAt;

    @Column(columnDefinition = "smallint default 1", nullable = false)
    private Short attendanceCount;

    protected AttendanceLog() {}

    @Builder
    public AttendanceLog(
        Member member,
        Short attendanceCount
    ) {
        this.member = member;
        this.attendanceCount = attendanceCount;
    }

    @PrePersist
    private void onCreate() {
        if (this.attendanceAt == null) {
            this.attendanceAt = LocalDateTime.now();
        }
    }
}
