package com.chestnut.backend.rewardLog;

import com.chestnut.backend.member.Member;
import jakarta.persistence.*;
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
    @JoinColumn(name="member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="log_type_id", nullable = false)
    private LogType logType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="reward_type_id", nullable = false)
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
