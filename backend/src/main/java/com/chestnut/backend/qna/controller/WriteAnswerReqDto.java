package com.chestnut.backend.qna.controller;

import com.chestnut.backend.common.validation.annotation.Content;
import com.chestnut.backend.qna.dto.WriteAnswerDto;
import lombok.Getter;

@Getter
public class WriteAnswerReqDto {

    @Content
    private String answer;

    public WriteAnswerDto toDTO(String loginId, String role, String answer, Long qnaId) {
        return new WriteAnswerDto(loginId, role, answer, qnaId);
    }
}
