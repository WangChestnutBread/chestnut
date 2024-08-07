package com.chestnut.backend.qna.controller;

import com.chestnut.backend.qna.dto.WriteQuestionDTO;
import lombok.Getter;

@Getter
public class WriteQuestionReqDTO {
    private byte qnaCategoryId;
    private String title;
    private String content;

    public WriteQuestionDTO toDTO(String loginId) {
        return new WriteQuestionDTO(loginId, qnaCategoryId, title, content);
    }
}
