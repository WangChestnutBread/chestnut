package com.chestnut.backend.qna.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QnAListDTO {

    private Long qnaId;
    private Byte qnaCategoryId;
    private String qnaCategoryName;
    private String title;
    private String nickname;
    private LocalDateTime createdAt;
    private boolean isAnswer;
}
