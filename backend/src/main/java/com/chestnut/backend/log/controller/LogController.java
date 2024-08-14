package com.chestnut.backend.log.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.log.service.LogService;
import com.chestnut.backend.member.dto.CustomMemberDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/log")
@RequiredArgsConstructor
public class LogController {

    private final LogService logService;

    @GetMapping("/study")
    public ResponseEntity<?> saveStudyLog(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestParam("studyId") Long studyId,
            @RequestParam("isPass") int isPass
    ) {
        String loginId = customMemberDetails.getLoginId();
        logService.saveStudyLog(loginId, studyId, isPass == 1);
        ResponseDto<Object> result = new ResponseDto<>("200", null);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/word-list")
    public ResponseEntity<?> getWordList(
        @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
        @RequestParam("year") int year,
        @RequestParam("month") int month,
        @RequestParam("day") int day
    ) {
        String loginId = customMemberDetails.getLoginId();
        List<String> studiedWordList = logService.getStudiedWordList(loginId, year, month, day);
        ResponseDto<List<String>> result = new ResponseDto<>("200", studiedWordList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
