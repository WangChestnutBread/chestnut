package com.chestnut.backend.qna.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.member.dto.CustomMemberDetails;
import com.chestnut.backend.qna.dto.QnADetailResDto;
import com.chestnut.backend.qna.dto.QnAResDto;
import com.chestnut.backend.qna.dto.WriteAnswerDto;
import com.chestnut.backend.qna.dto.WriteQuestionDto;
import com.chestnut.backend.qna.service.QnAService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class QnAController {

    private final QnAService qnAService;

    @GetMapping("/qna")
    public ResponseEntity<?> getQnAList(@AuthenticationPrincipal CustomMemberDetails customMemberDetails,
                                        @RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        QnAResDto qnAResDTO = qnAService.getQnAList(customMemberDetails.getLoginId(), customMemberDetails.getRole(), pageable);
        return new ResponseEntity<>(new ResponseDto<>("200", qnAResDTO), HttpStatus.OK);
    }

    @GetMapping("/qna/{qnaId}")
    public ResponseEntity<?> getQnADetail(@AuthenticationPrincipal CustomMemberDetails customMemberDetails,
                                          @PathVariable Long qnaId) {
        QnADetailResDto qnADetailResDTO = qnAService.getQnADetail(customMemberDetails.getLoginId(), qnaId);
        return new ResponseEntity<>(new ResponseDto<>("200", qnADetailResDTO), HttpStatus.OK);
    }

    @PostMapping("/qna")
    public ResponseEntity<?> writeQuestion(@AuthenticationPrincipal CustomMemberDetails customMemberDetails,
                                      @Valid @RequestBody WriteQuestionReqDto writeqnaReqDTO) {
        WriteQuestionDto writeQuestionDTO = writeqnaReqDTO.toDTO(customMemberDetails.getLoginId());
        qnAService.writeQuestion(writeQuestionDTO);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @PostMapping("/qna/{qnaId}/answer")
    public ResponseEntity<?> writeAnswer(@AuthenticationPrincipal CustomMemberDetails customMemberDetails,
                                         @Valid @RequestBody WriteAnswerReqDto writeAnswerReqDTO,
                                         @PathVariable Long qnaId) {

        WriteAnswerDto writeAnswerDTO = writeAnswerReqDTO.toDTO(customMemberDetails.getLoginId(), customMemberDetails.getRole(), writeAnswerReqDTO.getAnswer(), qnaId);
        qnAService.writeAnswer(writeAnswerDTO);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }
}
