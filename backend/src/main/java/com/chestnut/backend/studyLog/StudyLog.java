package com.chestnut.backend.studyLog;

import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.study.entity.Chapter;
import com.chestnut.backend.study.entity.Study;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="Study_log")
@Getter
public class StudyLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned", nullable = false)
    private Long studyLogId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="chapter_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Chapter chapter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="study_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Study study;

    @Column(columnDefinition = "timestamp default now()", nullable = false)
    private LocalDateTime studiedAt;

    @Column(columnDefinition = "date default (CURRENT_DATE)", nullable = false)
    private LocalDate studiedDay;

    @Column(columnDefinition = "tinyint", nullable = false)
    private int todayCount;

    @Column(columnDefinition = "tinyint(1) default 0", nullable = false)
    private boolean isPass;

    @Column(columnDefinition = "tinyint(1) default 0", nullable = false)
    private boolean passRecord;

    protected StudyLog() {}

    @Builder
    public StudyLog(
            Member member,
            Chapter chapter,
            Study study,
            int todayCount,
            boolean isPass,
            boolean passRecord
    ) {
        this.member = member;
        this.chapter = chapter;
        this.study = study;
        this.todayCount = todayCount;
        this.isPass = isPass;
        this.passRecord = passRecord;
    }

    @PrePersist
    private void onCreate() {
        if (this.studiedAt == null) {
            this.studiedAt = LocalDateTime.now();
        }
        if (this.studiedDay == null) {
            this.studiedDay = LocalDate.now();
        }
    }
}
