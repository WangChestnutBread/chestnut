package com.chestnut.backend.study.service;

import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.study.dto.ChapterInfoDto;
import com.chestnut.backend.study.dto.ChapterStudyInfo;
import com.chestnut.backend.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;

    /**
     * 챕터명과 챕터 진도율 조회 쿼리
     */
    @Transactional(readOnly = true)
    public List<ChapterInfoDto> getChapterInfo(Long memberId) {
//        Long memberId = memberRepository.findMemberIdByLoginId(loginId);
        return studyRepository.findChapterInfoByMemberId(memberId);
    }

    /**
     * 챕터내 학습 목록 조회(1,2,3,5,6 단원용)
     */
    @Transactional(readOnly = true)
    public List<?> findChapterStudyInfo(Long memberId, int chapterId) {

        //loginId -> memberId로 바꾸는 로직 추가

        if (chapterId == 4) {
            return studyRepository.getPhonologyStudyInfo();
        } else if (chapterId == 7) {
            return studyRepository.getConfusedStudyInfo();
        } else {
            return studyRepository.findChapterStudyInfo(memberId, chapterId);
        }
    }

}
