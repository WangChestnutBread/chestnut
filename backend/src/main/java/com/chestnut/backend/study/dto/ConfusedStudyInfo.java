package com.chestnut.backend.study.dto;

import lombok.*;

@Getter
@ToString
@Builder
public class ConfusedStudyInfo {
    private Long studyId;
    private int confusedGroupId;
    private String word;
    private String pronounce;
    @Setter
    private int isPass;
    @Setter
    private int isStudy;
}
