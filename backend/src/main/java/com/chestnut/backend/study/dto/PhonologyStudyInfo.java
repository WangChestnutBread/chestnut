package com.chestnut.backend.study.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PhonologyStudyInfo {
    private String categoryContent;
    private Long studyCategoryId;
    private Long studyId;
    private String phonologyRule;
    private String phonologyExplanation;
    private String example;
}
