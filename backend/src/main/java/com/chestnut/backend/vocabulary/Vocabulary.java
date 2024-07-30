package com.chestnut.backend.vocabulary;

import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.study.Study;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name="Vocabulary")
@Getter
@IdClass(VocabularyId.class)
public class Vocabulary {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="study_id")
    private Study study;

    protected Vocabulary() {}
}
