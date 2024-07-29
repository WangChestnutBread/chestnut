package com.chestnut.backend.vocabulary;

import com.chestnut.backend.member.Member;
import com.chestnut.backend.study.Study;

import java.io.Serializable;
import java.util.Objects;

public class VocabularyId implements Serializable {
    private Member member;
    private Study study;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VocabularyId that = (VocabularyId) o;
        return Objects.equals(member, that.member) && Objects.equals(study, that.study);
    }

    @Override
    public int hashCode() {
        return Objects.hash(member, study);
    }
}
