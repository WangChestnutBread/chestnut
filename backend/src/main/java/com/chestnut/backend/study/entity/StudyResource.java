package com.chestnut.backend.study.entity;

import jakarta.persistence.*;
import lombok.Getter;

//읽기 전용 테이블이므로 기본 생성자만 만들고 따로 다른 생성자나 Builder은 만들지 않겠음
@Entity
@Table(name="Study_resource")
@DiscriminatorValue("RESOURCE")
@Getter
public class StudyResource extends Study {

    @Column(columnDefinition = "text", nullable = false)
    private String pronounceMethod;

    @Column(columnDefinition = "varchar(255)", nullable = false)
    private String mouthImg;

    @Column(columnDefinition = "varchar(255)", nullable = false)
    private String tongueImg;

    @Enumerated(EnumType.STRING)
    private SyllableLocation syllableLocation;

    protected StudyResource() {}
}
