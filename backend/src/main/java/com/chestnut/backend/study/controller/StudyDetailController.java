package com.chestnut.backend.study.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.member.dto.CustomMemberDetails;
import com.chestnut.backend.study.dto.ImgUrlDto;
import com.chestnut.backend.study.dto.PronounceMethodDto;
import com.chestnut.backend.study.dto.PronunceEvaluateDto;
import com.chestnut.backend.study.dto.WordPronounceDto;
import com.chestnut.backend.study.service.PronounceEvaluateService;
import com.chestnut.backend.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study/detail")
public class StudyDetailController {

    private final StudyService studyService;
    private final PronounceEvaluateService pronounceEvaluateService;

    @GetMapping("/{studyId}/word")
    public ResponseEntity<?> wordInfo(@PathVariable("studyId") Long studyId) {
        WordPronounceDto wordInfo = studyService.getWordInfo(studyId);
        ResponseDto<WordPronounceDto> result = new ResponseDto<>("200", wordInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{studyId}/image")
    public ResponseEntity<?> pronounceImgUrl(@PathVariable("studyId") Long studyId) {
        ImgUrlDto imgUrl = studyService.getImgUrl(studyId);
        ResponseDto<ImgUrlDto> result = new ResponseDto<>("200", imgUrl);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{studyId}/example-sentences")
    public ResponseEntity<?> relatedSentences(@PathVariable("studyId") Long studyId) {
        List<String> sentences = studyService.getSentences(studyId);
        ResponseDto<List<String>> result = new ResponseDto<>("200", sentences);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/pronunciation")
    public ResponseEntity<?> pronounceMethods(@RequestParam Map<String, String> params) {
        List<PronounceMethodDto> pronounceMethods = studyService.getPronounceMethod(params);
        ResponseDto<List<PronounceMethodDto>> result = new ResponseDto<>("200", pronounceMethods);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/pronunciation/evaluate")
    public ResponseEntity<?> checkPronunciation(@RequestParam("word") String word,
                                                @RequestParam("audio") MultipartFile audioFile,
                                                @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        PronunceEvaluateDto evaluation = pronounceEvaluateService.pronounceEvaluate(customMemberDetails.getLoginId(), word, audioFile);
        return new ResponseEntity<>(new ResponseDto<>("200", evaluation), HttpStatus.OK);
    }
    
}
