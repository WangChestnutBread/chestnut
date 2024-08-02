package com.chestnut.backend.study.controller;

import com.chestnut.backend.common.dto.ResponseDto;
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
@RequestMapping("/study/detail")
public class StudyDetailController {

    private final StudyService studyService;

    @GetMapping("/{studyId}/word")
    public ResponseEntity<?> wordInfo(@PathVariable("studyId") Long studyId) {
        WordPronounceDto wordInfo = studyService.getWordInfo(studyId);
        ResponseDto<WordPronounceDto> result = new ResponseDto<>("200", wordInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/pronunciation")
    public ResponseEntity<?> pronounceMethods(@RequestParam Map<String, String> params) {
        List<PronounceMethodDto> pronounceMethods = studyService.getPronounceMethod(params);
        ResponseDto<List<PronounceMethodDto>> result = new ResponseDto<>("200", pronounceMethods);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
