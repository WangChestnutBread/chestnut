package com.chestnut.backend.study.service;

import com.chestnut.backend.common.exception.NotFoundException;
import com.chestnut.backend.study.dto.*;
import com.chestnut.backend.study.entity.Study;
import com.chestnut.backend.study.entity.StudyResource;
import com.chestnut.backend.study.entity.SyllableLocation;
import com.chestnut.backend.study.repository.StudyInfoRepository;
import com.chestnut.backend.study.repository.StudyRepository;
import com.chestnut.backend.study.repository.StudyResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final StudyInfoRepository studyInfoRepository;
    private final StudyRepository studyRepository;
    private final StudyResourceRepository studyResourceRepository;

    /**
     * 챕터명과 챕터 진도율 조회 쿼리
     */
    @Transactional(readOnly = true)
    public List<ChapterInfoDto> getChapterInfo(Long memberId) {
//        Long memberId = memberRepository.findMemberIdByLoginId(loginId);
        return studyInfoRepository.findChapterInfoByMemberId(memberId);
    }

    /**
     * 챕터내 학습 목록 조회(1,2,3,5,6 단원용)
     */
    @Transactional(readOnly = true)
    public List<?> findChapterStudyInfo(Long memberId, int chapterId) {

        //loginId -> memberId로 바꾸는 로직 추가
        return switch (chapterId) {
            case 4 -> phonologyGroupInfo();
            case 7 -> studyInfoRepository.getConfusedStudyInfo();
            default -> studyInfoRepository.findChapterStudyInfo(memberId, chapterId);
        };
    }

    /**
     * 챕터내 학습 목록 조회 (4단원)
     */
    @Transactional(readOnly = true)
    public List<PhonologyGroupInfoDto> phonologyGroupInfo() {
        List<Long> studyCategoryIds = Arrays.asList(22L, 23L, 24L, 25L);
        List<String> categoryName = studyInfoRepository.getCategoryName(studyCategoryIds);
        Map<Long, List<PhonologyStudyInfo>> phonologyStudyInfo = studyInfoRepository.getPhonologyStudyInfo(studyCategoryIds);

        return IntStream.range(0, studyCategoryIds.size())
                .mapToObj(i -> new PhonologyGroupInfoDto(
                        categoryName.get(i),
                        studyCategoryIds.get(i),
                        phonologyStudyInfo.getOrDefault(studyCategoryIds.get(i), Collections.emptyList())
                ))
                .collect(Collectors.toList());
    }



    /**
     * 학습 상세 페이지 - 표기와 발음 조회
     */
    @Transactional(readOnly = true)
    public WordPronounceDto getWordInfo(Long studyId) {
        Study study = studyRepository
                .findById(studyId)
                .orElseThrow(NotFoundException::new);
        return new WordPronounceDto(study.getWord(), study.getPronounce());
    }

    /**
     * 학습 상세 페이지 - 발음 방법
     */
    @Transactional(readOnly = true)
    public List<PronounceMethodDto> getPronounceMethod(Map<String, String> words) {
        List<PronounceMethodDto> list = new ArrayList<>();
        SyllableLocation[] locations = SyllableLocation.values();
        String[] params = new String[]{"initial", "middle", "last"};

        for (int i = 0; i < 3; i++) {
            String word = words.getOrDefault(params[i], "none");
            if (word.equals("none")) continue;
            PronounceMethodDto dto = studyRepository.findPronounceMethod(word, locations[i])
                    .orElseThrow(NotFoundException::new);
            list.add(dto);
        }

        return list;
    }



    /**
     * 학습 상세 페이지 - 이미지
     */
    @Transactional(readOnly = true)
    public ImgUrlDto getImgUrl(Long studyId) {
        StudyResource url = studyResourceRepository.findByStudyId(studyId)
                .orElseThrow(NotFoundException::new);
        return new ImgUrlDto(url.getTongueImg(), url.getMouthImg());
    }

    /**
     * 학습 상세 페이지 - 단어 관련 문장 조회
     */
    @Transactional(readOnly = true)
    public List<String> getSentences(Long studyId) {
        Study study = studyRepository.findByStudyId(studyId)
                .orElseThrow(NotFoundException::new);

        return studyRepository.findSentences(study.getWord())
                .orElse(new ArrayList<>())
                .stream()
                .limit(3)
                .collect(Collectors.toCollection(ArrayList::new));
    }





}
