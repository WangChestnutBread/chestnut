package com.chestnut.backend.study.repository;

import com.chestnut.backend.study.dto.PronounceMethodDto;
import com.chestnut.backend.study.entity.Study;
import com.chestnut.backend.study.entity.SyllableLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Long> {

    Optional<Study> findByStudyId(Long studyId);

    @Query(
            "select new com.chestnut.backend.study.dto.PronounceMethodDto(s.word, sr.pronounceMethod) " +
                    "from Study s join StudyResource sr on s.studyId = sr.studyId " +
                    "where s.word = :word and sr.syllableLocation = :location"
    )
    Optional<PronounceMethodDto> findPronounceMethod(@Param("word") String word, @Param("location") SyllableLocation location);

    @Query("select s.word from Study s where s.chapter.chapterId = 6 and s.word like concat('%', :word, '%')")
    Optional<List<String>> findSentences(@Param("word") String word);

    @Query("select s from Study s join fetch s.chapter where s.studyId = :studyId")
    Optional<Study> findByStudyIdWithChapter(Long studyId);

    @Query("select s from Study s where s.chapter.chapterId = :chapterId and (:chapterId != 1 or s.studyId < 100)")
    List<Study> findStudyListByChapter(@Param("chapterId") Byte chapterId);

    @Query("select s.studyId from Study s")
    List<Long> getStudyIdList();
}