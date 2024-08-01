package com.chestnut.backend.study.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

//읽기 전용 테이블이므로 기본 생성자만 만들고 따로 다른 생성자나 Builder은 만들지 않겠음
@Entity
@Table(name="Chapter")
@Getter
public class Chapter {

    @Id
    @Column(columnDefinition = "tinyint", nullable = false)
    private Integer chapterId;

    @Column(columnDefinition = "varchar(10)", nullable = false)
    private String chapterName;

    @Column(columnDefinition = "smallint", nullable = false)
    private int totalStudies;

    protected Chapter() {}
}
