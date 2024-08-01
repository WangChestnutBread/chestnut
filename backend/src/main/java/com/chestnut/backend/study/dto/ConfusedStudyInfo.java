package com.chestnut.backend.study.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ConfusedStudyInfo {
    private Long parentCategoryId;
    private String parentCategory;
    private Long studyCategoryId;
    private String categoryContent;
    private Long studyId;
    private int confusedGroupId;
    private String word;
    private String pronounce;
}
