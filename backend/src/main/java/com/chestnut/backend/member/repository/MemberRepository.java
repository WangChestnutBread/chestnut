package com.chestnut.backend.member.repository;

import com.chestnut.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Boolean existsByLoginId(String loginId);
    Optional<Member> findByLoginId(String loginId);
}
