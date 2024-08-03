package com.chestnut.backend.study.repository;

import com.chestnut.backend.study.entity.StudyResource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudyResourceRepository extends JpaRepository<StudyResource, Long> {
    Optional<StudyResource> findByStudyId(Long studyId);
}
