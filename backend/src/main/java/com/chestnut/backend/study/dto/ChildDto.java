package com.chestnut.backend.study.dto;

import lombok.*;

import java.util.List;

@Getter
@ToString
@Builder
public class ChildDto {
    private Byte studyCategoryId;
    private String categoryContent;
    private List<ConfusedStudyInfo> grandChildCategory;
}
