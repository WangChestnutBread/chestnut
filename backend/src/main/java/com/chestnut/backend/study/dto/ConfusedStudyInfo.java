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
    private Byte parentCategoryId;
    private String parentCategory;
    private Byte studyCategoryId;
    private String categoryContent;
    private Long studyId;
    private int confusedGroupId;
    private String word;
    private String pronounce;
}
