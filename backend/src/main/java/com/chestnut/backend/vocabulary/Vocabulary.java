package com.chestnut.backend.vocabulary;

import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.study.entity.Study;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name="Vocabulary")
@Getter
@IdClass(VocabularyId.class)
public class Vocabulary {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="study_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Study study;

    protected Vocabulary() {}
}
