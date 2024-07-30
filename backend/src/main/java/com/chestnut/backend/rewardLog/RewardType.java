package com.chestnut.backend.rewardLog;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name="Reward_type")
@Getter
public class RewardType {

    @Id
    @Column(columnDefinition = "tinyint", nullable = false)
    private Integer rewardTypeId;

    @Column(columnDefinition = "varchar(10)", nullable = false)
    private String rewardCategory;

    @Column(columnDefinition = "tinyint", nullable = false)
    private int rewardAmount;

    protected RewardType() {}
}
