package com.chestnut.backend.member.repository;

import com.chestnut.backend.member.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByLoginId(String loginId);

    Optional<Member> findByMemberName(String memberName);

    Boolean existsByNickname(String nickname);

    Boolean existsByLoginId(String loginId);

    Boolean existsByEmail(String email);

    @EntityGraph(attributePaths = {"avatar"})
    List<Member> findTop10ByOrderByRankingAsc();
}
