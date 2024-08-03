package com.chestnut.backend.study.repository;

import com.chestnut.backend.study.entity.StudyCategory;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudyCategoryRepository extends JpaRepository<StudyCategory, Byte> {

//    @EntityGraph(attributePaths = "child") //EntityGraph 사용
//    @Query("SELECT sc FROM StudyCategory sc WHERE sc.studyCategoryId IN :ids")
    @Query("select distinct sc from StudyCategory sc join fetch sc.child where sc.studyCategoryId in :ids") //join fetch 사용
    List<StudyCategory> findByStudyCategoryIds(List<Byte> ids);
}
