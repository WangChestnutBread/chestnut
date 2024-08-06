package com.chestnut.backend.qna.repository;

import com.chestnut.backend.qna.entity.QnA;
import com.chestnut.backend.qna.entity.QnACategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QnARepository extends JpaRepository<QnA, Long> {
    @EntityGraph(attributePaths = {"member", "qnaCategory"})
    Page<QnA> findAllByMemberMemberId(Long memberId, Pageable pageable);

    Optional<QnA> findByqnaId(Long qnaId);

}
