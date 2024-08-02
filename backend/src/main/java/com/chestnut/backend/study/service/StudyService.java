package com.chestnut.backend.study.service;

import com.chestnut.backend.common.exception.NotFoundException;
import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.study.dto.ChapterInfoDto;
import com.chestnut.backend.study.dto.PronounceMethodDto;
import com.chestnut.backend.study.dto.WordPronounceDto;
import com.chestnut.backend.study.entity.Study;
import com.chestnut.backend.study.entity.StudyResource;
import com.chestnut.backend.study.entity.SyllableLocation;
import com.chestnut.backend.study.repository.StudyInfoRepository;
import com.chestnut.backend.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final StudyInfoRepository studyInfoRepository;
    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;

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
            case 4 -> studyInfoRepository.getPhonologyStudyInfo();
            case 7 -> studyInfoRepository.getConfusedStudyInfo();
            default -> studyInfoRepository.findChapterStudyInfo(memberId, chapterId);
        };
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



}
