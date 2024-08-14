package com.chestnut.backend.study.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.member.dto.CustomMemberDetails;
import com.chestnut.backend.study.dto.ChapterInfoDto;
import com.chestnut.backend.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
@Slf4j
public class StudyController {

    private final StudyService studyService;

    @GetMapping("/chapter")
    public ResponseEntity<?> chapterInfo(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        String loginId = customMemberDetails.getLoginId();
        List<ChapterInfoDto> chapterInfo = studyService.getChapterInfo(loginId); //loginId 넣기
        ResponseDto<List<ChapterInfoDto>> result = new ResponseDto<>("200", chapterInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/chapter/{chapterId}")
    public ResponseEntity<?> chapterStudyList(
            @PathVariable("chapterId") Integer chapterId,
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails
    ) {
        String loginId = customMemberDetails.getLoginId();
        List<?> chapterStudyInfo = studyService.findChapterStudyInfo(loginId, chapterId);
        ResponseDto<List<?>> result = new ResponseDto<>("200", chapterStudyInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/study-id")
    public ResponseEntity<?> getStudyIdList() {
        List<Long> studyIdList = studyService.getWholeStudyIdList();
//        List<Long> studyIdList = List.of(1L, 2L, 3L);
        log.debug("study-id");
        ResponseDto<List<Long>> result = new ResponseDto<>("200", studyIdList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
