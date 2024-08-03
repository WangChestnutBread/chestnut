package com.chestnut.backend.study.service;

import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.study.dto.*;
import com.chestnut.backend.study.entity.StudyCategory;
import com.chestnut.backend.study.entity.StudyConfusedPronounce;
import com.chestnut.backend.study.entity.StudyResource;
import com.chestnut.backend.study.entity.SyllableLocation;
import com.chestnut.backend.study.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@ExtendWith(SpringExtension.class)
@SpringBootTest
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

    @Autowired
    StudyCategoryRepository studyCategoryRepository;

    @Autowired
    StudyConfusedPronounceRepository studyConfusedPronounceRepository;

    @Test
    @Transactional(readOnly = true)
    public void 챕터_정보_조회() throws Exception {
        List<ChapterInfoDto> infoList = studyInfoRepository.findChapterInfoByMemberId(1L);
        System.out.println(infoList);
    }

    @Test
    @Transactional(readOnly = true)
    public void 챕터_학습_조회() throws Exception {
        List<ChapterStudyInfo> list = studyInfoRepository.findChapterStudyInfo(1L, 3);
        for (ChapterStudyInfo l : list) {
            System.out.println(l);
        }
    }

    @Test
    @Transactional(readOnly = true)
    public void 음운론_조회() throws Exception {
        List<Byte> ids = Arrays.asList((byte)22, (byte)23, (byte)4, (byte)25);
        List<String> names = studyInfoRepository.getCategoryName(ids);
//        Map<Long, List<PhonologyStudyInfo>> infos = studyInfoRepository.getPhonologyStudyInfo(ids);
        System.out.println(names);
//        System.out.println(infos);
//        List<PhonologyGroupInfoDto> phonologyGroupInfoDtos = studyService.phonologyGroupInfo();
//        System.out.println(phonologyGroupInfoDtos);

    }


    @Test
    @Transactional(readOnly = true)
    public void 발음_방법_조회() throws Exception {
        Optional<PronounceMethodDto> resource = studyRepository.findPronounceMethod("ㄱ", SyllableLocation.INITIAL);
        System.out.println(resource.get());
    }

    @Test
    @Transactional(readOnly = true)
    public void 이미지_조회() throws Exception {
        Optional<StudyResource> url = studyResourceRepository.findByStudyId(1L);
        System.out.println(url.get());
    }

    @Test
    @Transactional(readOnly = true)
    public void 문장_조회() throws Exception {
        List<String> sentences = studyService.getSentences(603L);
        System.out.println(sentences);
    }

    @Test
    @Transactional(readOnly = true)
    public void 카테고리_조회() throws Exception {
        List<StudyCategory> categories = studyCategoryRepository.findByStudyCategoryIds(Arrays.asList((byte) 1, (byte) 2));
        List<StudyCategory> childs = categories.stream()
                .flatMap(category -> category.getChild().stream())
                .toList();
        List<StudyConfusedPronounce> confusedWords = studyConfusedPronounceRepository.findByCategories(childs);
        Map<Byte, List<StudyConfusedPronounce>> collect = confusedWords.stream()
                .collect(Collectors.groupingBy(item -> item.getStudyCategory().getStudyCategoryId()));


        //ParentDto 만들기
        List<ParentDto> list = categories.stream()
                .map(category -> mapToParentDto(category, collect))
                .toList();

        System.out.println(list);
    }

    static ParentDto mapToParentDto(StudyCategory studyCategory, Map<Byte, List<StudyConfusedPronounce>> collect) {
        List<ChildDto> childs = studyCategory.getChild().stream()
                .map(childCategory -> mapToChildDto(childCategory, collect))
                .toList();

        return ParentDto.builder()
                .parentCategoryId(studyCategory.getStudyCategoryId())
                .parentCategory(studyCategory.getCategoryContent())
                .childCategory(childs)
                .build();
    }

    static ChildDto mapToChildDto(StudyCategory studyCategory, Map<Byte, List<StudyConfusedPronounce>> collect) {
        List<StudyConfusedPronounce> studyInfos = collect.getOrDefault(studyCategory.getStudyCategoryId(), Collections.emptyList());
        List<ConfusedStudyInfo> confusedWords = studyInfos.stream()
                .map(info -> makeStudyInfo(info))
                .toList();

        return ChildDto.builder()
                .studyCategoryId(studyCategory.getStudyCategoryId())
                .categoryContent(studyCategory.getCategoryContent())
                .grandChildCategory(confusedWords)
                .build();
    }

    static ConfusedStudyInfo makeStudyInfo(StudyConfusedPronounce word) {
        return ConfusedStudyInfo.builder()
                .studyId(word.getStudyId())
                .confusedGroupId(word.getConfusedGroupId())
                .word(word.getWord())
                .pronounce(word.getPronounce())
                .build();
    }


}