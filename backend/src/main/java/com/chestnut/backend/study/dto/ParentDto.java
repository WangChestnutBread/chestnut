package com.chestnut.backend.study.dto;

import lombok.*;

import java.util.List;

@Getter
@ToString
@Builder
public class ParentDto {
    private Byte parentCategoryId;
    private String parentCategory;
    private List<ChildDto> childCategory;
}
