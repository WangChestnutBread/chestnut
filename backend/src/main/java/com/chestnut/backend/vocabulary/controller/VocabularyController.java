package com.chestnut.backend.vocabulary.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.member.dto.CustomMemberDetails;
import com.chestnut.backend.vocabulary.dto.VocabularyDto;
import com.chestnut.backend.vocabulary.entity.Vocabulary;
import com.chestnut.backend.vocabulary.service.VocabularyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vocabulary")
@RequiredArgsConstructor
public class VocabularyController {

    private final VocabularyService vocabularyService;

    @PostMapping
    public ResponseEntity<?> addVocabulary(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody Map<String, String> payload
            ){
        String loginId = customMemberDetails.getLoginId();
        Long studyId = Long.parseLong(payload.get("studyId"));
        vocabularyService.addVocabulary(studyId, loginId);
        ResponseDto<Object> result = new ResponseDto<>("200", null);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteVocabulary(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody Map<String, String> payload
    ) {
        String loginId = customMemberDetails.getLoginId();
        Long studyId = Long.parseLong(payload.get("studyId"));
        vocabularyService.deleteVocabulary(studyId, loginId);
        ResponseDto<Object> result = new ResponseDto<>("200", null);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getVocabularyList(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestParam("chapter") Byte chapter,
            @RequestParam("page") Integer page,
            @RequestParam("size") Integer size
    ) {
        String loginId = customMemberDetails.getLoginId();
        Page<VocabularyDto> vocabularyListPage = vocabularyService.getVocabularyList(loginId, chapter, page, size);
        ResponseDto<Page<VocabularyDto>> result = new ResponseDto<>("200", vocabularyListPage);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
