package com.chestnut.backend.study.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ChapterStudyInfoChildDto {
    private Long studyId;
    private String word;
    private int isPass;
    private int isStudy;
    private int isVocabList;
}
