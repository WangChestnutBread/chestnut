package com.chestnut.backend.qna.dto;

import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.qna.entity.QnA;
import com.chestnut.backend.qna.entity.QnACategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WriteQuestionDTO {
    private String loginId;
    private byte qnaCategoryId;
    private String title;
    private String content;

    public QnA toEntity(Member member, QnACategory category) {
        return QnA.builder()
                .member(member)
                .qnaCategory(category)
                .title(title)
                .content(content)
                .build();
    }
}
