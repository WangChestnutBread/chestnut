package com.chestnut.backend.study;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name="Study_confused_pronounce")
@Getter
public class StudyConfusedPronounce extends Study {

    @Column(columnDefinition = "tinyint", nullable = false)
    private int confusedGroupId;

    protected StudyConfusedPronounce() {}
}
