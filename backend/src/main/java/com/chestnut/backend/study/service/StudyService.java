package com.chestnut.backend.study.service;

import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.study.dto.ChapterInfoDto;
import com.chestnut.backend.study.repository.ChapterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final ChapterRepository chapterRepository;

    /**
     * 챕터명과 챕터 진도율 조회 쿼리
     */
    public List<ChapterInfoDto> getChapterInfo(Long memberId) {
        return chapterRepository.findChapterInfoByMemberId(memberId);
    }

}
