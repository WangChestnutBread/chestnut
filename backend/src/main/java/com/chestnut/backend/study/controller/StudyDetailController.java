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
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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

    /**
     * 발음 평가 요청을 처리하는 메서드.
     *
     * @param word 사용자 발음 평가를 위한 정답 단어
     * @param audioFile 사용자가 업로드한 오디오 파일
     * @param customMemberDetails 인증된 사용자 정보
     * @return ResponseEntity<?> 발음 평가 결과를 포함하는 ResponseEntity 객체
     */
    @PostMapping("/pronunciation/evaluate")
    public ResponseEntity<?> checkPronunciation(@RequestParam("word") String word,
                                                @RequestParam("sttPronounce") String sttPronounce,
                                                @RequestParam("audio") MultipartFile audioFile,
                                                @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        log.debug("STT 태그 : 요청 body 내용 "+word+" "+sttPronounce+" "+audioFile.getOriginalFilename());
        log.debug("STT 태그 : audio file resource "+audioFile.getResource());
        PronunceEvaluateDto evaluation = pronounceEvaluateService.pronounceEvaluate(customMemberDetails.getLoginId(), word, sttPronounce, audioFile);
        return new ResponseEntity<>(new ResponseDto<>("200", evaluation), HttpStatus.OK);
    }

    //TODO 더미 코드 - 배포시 제거
    @PostMapping("/pronunciation/evaluate/test/fail")
    public ResponseEntity<?> checkPronunciationTestFail(@RequestParam("word") String word,
                                                @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        PronunceEvaluateDto evaluation = new PronunceEvaluateDto(0, "그리고 안녕하시오", List.of(1, 2, 8), List.of(1, 2, 7));
        return new ResponseEntity<>(new ResponseDto<>("200", evaluation), HttpStatus.OK);
    }
    //TODO 더미 코드 - 배포시 제거
    @PostMapping("/pronunciation/evaluate/test/success")
    public ResponseEntity<?> checkPronunciationTestSuccess(@RequestParam("word") String word,
                                                    @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        PronunceEvaluateDto evaluation = new PronunceEvaluateDto(1, "그러나 안녕하세요", List.of(), List.of());
        return new ResponseEntity<>(new ResponseDto<>("200", evaluation), HttpStatus.OK);
    }
}
