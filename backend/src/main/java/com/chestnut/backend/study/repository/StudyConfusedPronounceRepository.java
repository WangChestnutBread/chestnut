package com.chestnut.backend.study.repository;

import com.chestnut.backend.study.entity.StudyCategory;
import com.chestnut.backend.study.entity.StudyConfusedPronounce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudyConfusedPronounceRepository extends JpaRepository<StudyConfusedPronounce, Long> {
    @Query("select s from StudyConfusedPronounce s where s.studyCategory in :categories")
    List<StudyConfusedPronounce> findByCategories(@Param("categories") List<StudyCategory> categories);
}
