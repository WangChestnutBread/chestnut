package com.chestnut.backend.member.repository;

import com.chestnut.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByLoginId(String loginId);

    Optional<Member> findByMemberName(String memberName);

    Boolean existsByNickname(String nickname);

    Boolean existsByLoginId(String loginId);

    Boolean existsByEmail(String email);
}
