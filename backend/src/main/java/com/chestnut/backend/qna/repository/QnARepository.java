package com.chestnut.backend.qna.repository;

import com.chestnut.backend.qna.entity.QnA;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface QnARepository extends JpaRepository<QnA, Long> {

    @Query(value = """
            select new com.chestnut.backend.qna.dto.
            QnAListDto(q.qnaId, q.qnaCategory.qnaCategoryId, q.qnaCategory.qnaCategoryName, q.title, q.member.nickname, q.createdAt, q.isAnswer)
            from QnA q
            """,
            countQuery = "select count(q) from QnA q")
    Page<QnA> findAll(Pageable pageable);

    @Query(value = """
            select new com.chestnut.backend.qna.dto.
            QnAListDto(q.qnaId, q.qnaCategory.qnaCategoryId, q.qnaCategory.qnaCategoryName, q.title, q.member.nickname, q.createdAt, q.isAnswer)
            from QnA q
            where q.member.nickname = :nickname
            """,
            countQuery = "select count(q) from QnA q")
    Page<QnA> findByMemberNickname(String nickname, Pageable pageable);

    @Query("select q from QnA q join fetch q.member join fetch q.qnaCategory where q.qnaId = :qnaId")
    Optional<QnA> findByqnaId(Long qnaId);

}
