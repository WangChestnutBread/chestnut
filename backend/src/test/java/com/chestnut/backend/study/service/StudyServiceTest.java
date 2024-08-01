package com.chestnut.backend.study.service;

import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.study.dto.*;
import com.chestnut.backend.study.entity.SyllableLocation;
import com.chestnut.backend.study.repository.StudyInfoRepository;
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
    StudyInfoRepository studyInfoRepository;

    @Autowired
    StudyService studyService;

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void 챕터_정보_조회() throws Exception {
        List<ChapterInfoDto> infoList = studyInfoRepository.findChapterInfoByMemberId(1L);
        System.out.println(infoList);
    }

    @Test
    public void 챕터_학습_조회() throws Exception {
        List<ChapterStudyInfo> list = studyInfoRepository.findChapterStudyInfo(1L, 3);
        for (ChapterStudyInfo l : list) {
            System.out.println(l);
        }
    }

    @Test
    public void 음운론_조회() throws Exception {
        List<PhonologyStudyInfo> list = studyInfoRepository.getPhonologyStudyInfo();
        for (PhonologyStudyInfo info : list) {
            System.out.println(info);
        }
    }

    @Test
    public void 헷갈_단어_조회() throws Exception {
        List<ConfusedStudyInfo> confusedStudyInfo = studyInfoRepository.getConfusedStudyInfo();
        for (ConfusedStudyInfo o : confusedStudyInfo) {
            System.out.println(o);
        }
    }

    @Test
    public void 학습컨텐츠_단어_발음_조회() throws Exception {
        WordPronounceDto wordInfo = studyService.getWordInfo(28L);
        System.out.println(wordInfo);
        System.out.println("Enum name() 값: " + SyllableLocation.FINAL.name());
    }

}