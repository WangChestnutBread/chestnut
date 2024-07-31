package com.chestnut.backend.member.repository;

import com.chestnut.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Boolean existsByLoginId(String loginId);
    Member findByLoginId(String loginId);
}
