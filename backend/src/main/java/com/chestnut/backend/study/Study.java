package com.chestnut.backend.study;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

//읽기 전용 테이블이므로 기본 생성자만 만들고 따로 다른 생성자나 Builder은 만들지 않겠음
@Entity
@Table(name="Study")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name="chapter_type")
@Getter
public abstract class Study {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned")
    private Long studyId;

    @Column(columnDefinition = "varchar(70)")
    private String word;

    @Column(columnDefinition = "varchar(70)")
    private String pronounce;

//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private ChapterType chapterType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="chapter_id", nullable = false)
    private Chapter chapter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="study_category_id")
    private StudyCategory studyCategory;

    protected Study() {}

}
