package com.chestnut.backend.study.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.study.dto.ChapterInfoDto;
import com.chestnut.backend.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class StudyController {

    private final StudyService studyService;

    @GetMapping("/study/chapter")
    public ResponseEntity<?> chapterInfo() {
        try {
            Long memberId = 1L; //
            List<ChapterInfoDto> chapterInfo = studyService.getChapterInfo(memberId);
            ResponseDto<List<ChapterInfoDto>> result = new ResponseDto<>("200", chapterInfo);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            //알수없는 오류
            ResponseDto<?> result = new ResponseDto<>("299", null);
            return new ResponseEntity<ResponseDto<?>>(result, HttpStatus.OK);
        }
    }
}
