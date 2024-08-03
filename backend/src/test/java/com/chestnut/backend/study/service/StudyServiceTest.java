package com.chestnut.backend.study.service;

import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.study.dto.*;
import com.chestnut.backend.study.entity.StudyResource;
import com.chestnut.backend.study.entity.SyllableLocation;
import com.chestnut.backend.study.repository.StudyInfoRepository;
import com.chestnut.backend.study.repository.StudyRepository;
import com.chestnut.backend.study.repository.StudyResourceRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

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

    @Autowired
    StudyRepository studyRepository;

    @Autowired
    StudyResourceRepository studyResourceRepository;

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
        List<Long> ids = Arrays.asList(22L, 23L, 24L, 25L);
        List<String> names = studyInfoRepository.getCategoryName(ids);
//        Map<Long, List<PhonologyStudyInfo>> infos = studyInfoRepository.getPhonologyStudyInfo(ids);
        System.out.println(names);
//        System.out.println(infos);
//        List<PhonologyGroupInfoDto> phonologyGroupInfoDtos = studyService.phonologyGroupInfo();
//        System.out.println(phonologyGroupInfoDtos);

    }

    @Test
    public void 헷갈_단어_조회() throws Exception {
        List<ConfusedStudyInfo> confusedStudyInfo = studyInfoRepository.getConfusedStudyInfo();
        for (ConfusedStudyInfo o : confusedStudyInfo) {
            System.out.println(o);
        }
    }

    @Test
    public void 발음_방법_조회() throws Exception {
        Optional<PronounceMethodDto> resource = studyRepository.findPronounceMethod("ㄱ", SyllableLocation.INITIAL);
        System.out.println(resource.get());
    }

    @Test
    public void 이미지_조회() throws Exception {
        Optional<StudyResource> url = studyResourceRepository.findByStudyId(1L);
        System.out.println(url.get());
    }

    @Test
    public void 문장_조회() throws Exception {
        List<String> sentences = studyService.getSentences(603L);
        System.out.println(sentences);
    }



}