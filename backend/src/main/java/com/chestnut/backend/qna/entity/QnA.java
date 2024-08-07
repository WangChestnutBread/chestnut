package com.chestnut.backend.qna.entity;

import com.chestnut.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Table(name="QnA")
@Getter
public class QnA {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned", nullable = false)
    private Long qnaId;

    @Column(columnDefinition = "varchar(100)", nullable = false)
    private String title;

    @Column(columnDefinition = "text", nullable = false)
    private String content;

    @Column(columnDefinition = "timestamp default now()", nullable = false)
    private LocalDateTime createdAt;

    @Column(columnDefinition = "tinyint(1) default 0", nullable = false)
    private boolean isAnswer;

    @Column(columnDefinition = "text")
    private String answer;

    @Column(columnDefinition = "timestamp")
    private LocalDateTime answerAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="qna_category_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private QnACategory qnaCategory;

    protected QnA() {}

    @Builder
    public QnA(
            String title,
            String content,
            boolean isAnswer,
            String answer,
            LocalDateTime answerAt,
            Member member,
            QnACategory qnaCategory) {
        this.title = title;
        this.content = content;
        this.isAnswer = isAnswer;
        this.answer = answer;
        this.answerAt = answerAt;
        this.member = member;
        this.qnaCategory = qnaCategory;
    }

    @PrePersist
    private void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    public void writeAns(String answer) {
        this.answer = answer;
        this.isAnswer = true;
        this.answerAt = LocalDateTime.now();
    }

}
