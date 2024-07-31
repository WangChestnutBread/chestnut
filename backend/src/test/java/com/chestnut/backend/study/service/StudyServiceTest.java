package com.chestnut.backend.study.service;

import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.study.dto.PhonologyStudyInfo;
import com.chestnut.backend.study.dto.ChapterInfoDto;
import com.chestnut.backend.study.dto.ChapterStudyInfo;
import com.chestnut.backend.study.repository.StudyRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class StudyServiceTest {

    @Autowired
    StudyRepository studyRepository;

    @Autowired
    StudyService studyService;

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void 챕터_정보_조회() throws Exception {
        List<ChapterInfoDto> infoList = studyRepository.findChapterInfoByMemberId(1L);
        System.out.println(infoList);
    }

    @Test
    public void 챕터_학습_조회() throws Exception {
        List<ChapterStudyInfo> list = studyRepository.findChapterStudyInfo(1L, 3);
        for (ChapterStudyInfo l : list) {
            System.out.println(l);
        }
    }

    @Test
    public void 음운론_조회() throws Exception {
        List<PhonologyStudyInfo> list = studyRepository.getPhonologyStudyInfo(1L);
        for (PhonologyStudyInfo info : list) {
            System.out.println(info);
        }
    }

}