package com.chestnut.backend.study.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class PhonologyStudyInfo {
    private Byte studyCategoryId;
    private Long studyId;
    private String phonologyRule;
    private String phonologyExplanation;
    private String example;
    @Setter
    private int isPass;

    public PhonologyStudyInfo(Byte studyCategoryId, Long studyId, String phonologyRule, String phonologyExplanation, String example) {
        this.studyCategoryId = studyCategoryId;
        this.studyId = studyId;
        this.phonologyRule = phonologyRule;
        this.phonologyExplanation = phonologyExplanation;
        this.example = example;
    }

}
