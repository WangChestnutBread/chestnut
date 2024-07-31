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
    private Integer chapterId;
    private String chapterName;
    private int totalStudies;
    private Long chapterStudyCount;
}
