package com.chestnut.backend.qna.dto;

import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.qna.entity.QnA;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QnADetailResDTO {

    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String nickname;
    private String answer;
    private LocalDateTime answerAt;

    public QnADetailResDTO from(QnA qna) {
        return new QnADetailResDTO(qna.getTitle(), qna.getTitle(), qna.getCreatedAt(), qna.getMember().getNickname(), qna.getAnswer(), qna.getAnswerAt());
    }
}
