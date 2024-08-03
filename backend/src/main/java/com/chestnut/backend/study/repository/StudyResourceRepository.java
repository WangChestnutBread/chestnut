package com.chestnut.backend.study.repository;

import com.chestnut.backend.study.entity.StudyResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StudyResourceRepository extends JpaRepository<StudyResource, Long> {
    Optional<StudyResource> findByStudyId(Long studyId);
}
