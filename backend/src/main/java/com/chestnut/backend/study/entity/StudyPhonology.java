package com.chestnut.backend.study.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.ToString;

//읽기 전용 테이블이므로 기본 생성자만 만들고 따로 다른 생성자나 Builder은 만들지 않겠음
@Entity
@Table(name="Study_phonology")
@DiscriminatorValue("PHONOLOGY")
@Getter
@ToString
public class StudyPhonology extends Study {

    @Column(columnDefinition = "varchar(10)", nullable = false)
    private String phonologyRule;

    @Column(columnDefinition = "text")
    private String phonologyExplanation;

    @Column(columnDefinition = "text", nullable = false)
    private String example;

    protected StudyPhonology() {}
}
