package com.chestnut.backend.study.repository;

import com.chestnut.backend.study.dto.ChapterInfoDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChapterRepository {

    private final EntityManager em;

    /**
     * 챕터명과 챕터 진도율 조회 쿼리
     */
    public List<ChapterInfoDto> findChapterInfoByMemberId(Long memberId) {
        String query = "select new com.chestnut.backend.study.dto.ChapterInfoDto(" +
                "c.chapterId, " +
                "count(case when s.member.memberId is not null then 1 else null end), " +
                "c.chapterName, " +
                "c.totalStudies) " +
                "from Chapter c " +
                "left join StudyLog s on c.chapterId = s.chapter.chapterId " +
                "where (s.passRecord = true and s.member.memberId = :memberId) or s.member.memberId is null " +
                "group by c.chapterId";
        return em.createQuery(query, ChapterInfoDto.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }



}
