package com.chestnut.backend.study.dto;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class WordPronounceDto {

    private String word;
    private String pronounce;
}
