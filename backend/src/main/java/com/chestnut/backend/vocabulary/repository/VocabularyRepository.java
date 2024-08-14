package com.chestnut.backend.vocabulary.repository;

import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.study.entity.Study;
import com.chestnut.backend.vocabulary.dto.VocabularyDto;
import com.chestnut.backend.vocabulary.entity.Vocabulary;
import com.chestnut.backend.vocabulary.entity.VocabularyId;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VocabularyRepository extends JpaRepository<Vocabulary, VocabularyId> {

    Optional<Vocabulary> findByMemberAndStudy(Member member, Study study);

    @Query(value = "select new com.chestnut.backend.vocabulary.dto." +
            "VocabularyDto(v.study.studyId, v.study.chapter.chapterId, v.study.word, v.study.pronounce) " +
            "from Vocabulary v join v.study " +
            "where v.member = :member and v.study.chapter.chapterId = :chapterId",
            countQuery = "select count(v) from Vocabulary v where v.member = :member and v.study.chapter.chapterId = :chapterId")
    Page<VocabularyDto> findByMemberAndChapter(@Param("member") Member member, @Param("chapterId") Byte chapterId, Pageable pageable);

    @Query(value = "select new com.chestnut.backend.vocabulary.dto." +
            "VocabularyDto(v.study.studyId, v.study.chapter.chapterId, v.study.word, v.study.pronounce) " +
            "from Vocabulary v join v.study " +
            "where v.member = :member",
            countQuery = "select count(v) from Vocabulary v where v.member = :member")
    Page<VocabularyDto> findByMember(@Param("member") Member member, Pageable pageable);

    @Query("select v.study.studyId from Vocabulary v join v.study s where s.chapter.chapterId = :chapterId and v.member.memberId = :memberId")
    List<Long> findVocabListByMemberAndChapter(@Param("chapterId") Byte chapterId, @Param("memberId") Long memberId);
}
