package com.chestnut.backend.log.repository;

import com.chestnut.backend.log.entity.RewardType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardTypeRepository extends JpaRepository<RewardType, Byte> {

    RewardType findByRewardTypeId(Byte rewardTypeId);
}
