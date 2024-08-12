package com.chestnut.backend.qna.controller;

import com.chestnut.backend.common.validation.annotation.Content;
import com.chestnut.backend.common.validation.annotation.Title;
import com.chestnut.backend.qna.dto.WriteQuestionDto;
import lombok.Getter;

@Getter
public class WriteQuestionReqDto {
    private byte qnaCategoryId;
    @Title
    private String title;
    @Content
    private String content;

    public WriteQuestionDto toDTO(String loginId) {
        return new WriteQuestionDto(loginId, qnaCategoryId, title, content);
    }
}
