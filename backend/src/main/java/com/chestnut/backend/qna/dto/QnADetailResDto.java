package com.chestnut.backend.qna.dto;

import com.chestnut.backend.qna.entity.QnA;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QnADetailResDto {

    private byte qnaCategoryId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String nickname;
    private String answer;
    private LocalDateTime answerAt;

    public static QnADetailResDto from(QnA qna) {
        return new QnADetailResDto(qna.getQnaCategory().getQnaCategoryId(), qna.getTitle(), qna.getContent(),
                qna.getCreatedAt(), qna.getMember().getNickname(), qna.getAnswer(), qna.getAnswerAt());
    }
}
