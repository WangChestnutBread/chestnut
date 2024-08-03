package com.chestnut.backend.vocabulary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
public class VocabularyDto {
    private Long studyId;
    private Byte chapterId;
    private String word;
}
