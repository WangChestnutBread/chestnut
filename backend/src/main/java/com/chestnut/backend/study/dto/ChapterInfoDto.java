package com.chestnut.backend.study.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ChapterInfoDto {
    /**
     * 챕터명과 챕터 진도율 조회 쿼리
     * select c.chapter_id, count(CASE WHEN s.member_id IS NOT NULL THEN 1 ELSE NULL END) as chapter_study_count, c.chapter_name, c.total_studies
     * from chapter c left outer join study_log s
     * on c.chapter_id = s.chapter_id
     * where (pass_record = 1 and member_id = 1) or member_id is null
     * group by chapter_id;
     */
    private int chapterId;
    private Long chapterStudyCount;
    private String chapterName;
    private int totalStudies;
}
