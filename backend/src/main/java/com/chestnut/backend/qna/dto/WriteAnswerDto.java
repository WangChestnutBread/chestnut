package com.chestnut.backend.qna.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WriteAnswerDto {

    private String loginId;
    private String role;
    private String answer;
    private Long qnaId;

    public WriteAnswerDto toDTO(String loginId, String role, String answer, Long qnaId) {
        return new WriteAnswerDto(loginId, role, answer, qnaId);
    }
}
