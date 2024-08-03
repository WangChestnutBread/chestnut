package com.chestnut.backend.study.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name="study_confused_pronounce")
@DiscriminatorValue("CONFUSED_PRONOUNCE")
@Getter
public class StudyConfusedPronounce extends Study {

    @Column(columnDefinition = "tinyint", nullable = false)
    private byte confusedGroupId;

    protected StudyConfusedPronounce() {}

    @Override
    public String toString() {
        return "StudyConfusedPronounce{" +
                "studyId=" + getStudyId() +
                "word=" + getWord() +
                "confusedGroupId=" + confusedGroupId +
                '}';
    }
}
