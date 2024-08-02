package com.chestnut.backend.study.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.study.dto.ChapterInfoDto;
import com.chestnut.backend.study.dto.PronounceMethodDto;
import com.chestnut.backend.study.dto.WordPronounceDto;
import com.chestnut.backend.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
public class StudyController {

    private final StudyService studyService;

    @GetMapping("/chapter")
    public ResponseEntity<?> chapterInfo() {
        //loginId 추출 로직 추가
        List<ChapterInfoDto> chapterInfo = studyService.getChapterInfo(1L); //loginId 넣기
        ResponseDto<List<ChapterInfoDto>> result = new ResponseDto<>("200", chapterInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/chapter/{chapterId}")
    public ResponseEntity<?> chapterStudyList(@PathVariable("chapterId") Integer chapterId) {
        //loginId 추출 로직 추가
        List<?> chapterStudyInfo = studyService.findChapterStudyInfo(1L, chapterId); //loginId 넣기
        ResponseDto<List<?>> result = new ResponseDto<>("200", chapterStudyInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
