package com.chestnut.backend.study.service;

import com.chestnut.backend.study.dto.ChapterInfoDto;
import com.chestnut.backend.study.repository.ChapterRepository;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class StudyServiceTest {

    @Autowired
    ChapterRepository chapterRepository;

    @Autowired
    StudyService studyService;

    @Test
    public void 챕터_정보_조회() throws Exception {
        List<ChapterInfoDto> chapterInfoByMemberId = chapterRepository.findChapterInfoByMemberId(1L);
//        System.out.println(chapterInfoByMemberId);
        Assertions.assertThat(chapterInfoByMemberId.size()).isEqualTo(7);
    }
}