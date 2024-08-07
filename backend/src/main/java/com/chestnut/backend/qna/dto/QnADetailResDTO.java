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

    public void from(QnA qna) {
        this.title = qna.getTitle();
        this.content = qna.getContent();
        this.createdAt = qna.getCreatedAt();
        this.nickname = qna.getMember().getNickname();
        this.answer = qna.getAnswer();
        this.answerAt = qna.getAnswerAt();
    }
}
