package com.chestnut.backend.study.entity;

import jakarta.persistence.*;
import lombok.Getter;

//읽기 전용 테이블이므로 기본 생성자만 만들고 따로 다른 생성자나 Builder은 만들지 않겠음
@Entity
@Table(name="Study")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name="chapter_type")
@DiscriminatorValue("NONE")
@Getter
public class Study {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned")
    private Long studyId;

    @Column(columnDefinition = "varchar(70)")
    private String word;

    @Column(columnDefinition = "varchar(70)")
    private String pronounce;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="chapter_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Chapter chapter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="study_category_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private StudyCategory studyCategory;

    protected Study() {}

}
