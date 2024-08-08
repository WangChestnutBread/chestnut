package com.chestnut.backend.qna.controller;

import com.chestnut.backend.qna.dto.WriteAnswerDTO;
import lombok.Getter;

@Getter
public class WriteAnswerReqDTO {

    private String answer;

    public WriteAnswerDTO toDTO(String loginId, String role, String answer, Long qnaId) {
        return new WriteAnswerDTO(loginId, role, answer, qnaId);
    }
}
