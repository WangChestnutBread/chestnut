package com.chestnut.backend.log.entity;

import com.chestnut.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Table(name="Reward_log")
@Getter
public class RewardLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned", nullable = false)
    private Long rewardLogId;

    @Column(columnDefinition = "timestamp", nullable = false)
    private LocalDateTime rewardAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="log_type_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private LogType logType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="reward_type_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private RewardType rewardType;

    protected RewardLog() {}

    @Builder
    public RewardLog(
        Member member,
        LogType logType,
        RewardType rewardType
    ) {
        this.member = member;
        this.logType = logType;
        this.rewardType = rewardType;
    }

    @PrePersist
    private void onCreate() {
        if (this.rewardAt == null) {
            this.rewardAt = LocalDateTime.now();
        }
    }
}
