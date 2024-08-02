package com.chestnut.backend.avatar.repository;

import com.chestnut.backend.avatar.entity.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AvatarRepository extends JpaRepository<Avatar, Integer> {

    Optional<Avatar> findByAvatarId(Integer avatarId);

}
