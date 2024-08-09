package com.chestnut.backend.conversation.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.conversation.dto.ConversationDto;
import com.chestnut.backend.conversation.service.ConversationService;
import com.chestnut.backend.member.dto.CustomMemberDetails;
import com.chestnut.backend.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/conversation")
@Slf4j
public class ConversationController {

    private final ConversationService conversationService;

    @GetMapping("/start")
    public ResponseEntity<?> startConversation(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        conversationService.startConversation(customMemberDetails.getLoginId());
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @PostMapping("/message")
    public ResponseEntity<?> chatMessage( @RequestParam("audio") MultipartFile audioFile,
                                          @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        log.debug("STT 태그 : 요청 body 내용 "+audioFile.getOriginalFilename());
        log.debug("STT 태그 : audio file resource "+audioFile.getResource());
        ConversationDto conversationDto = conversationService.chatMessage(customMemberDetails.getLoginId(), audioFile);
        return new ResponseEntity<>(new ResponseDto<>("200", conversationDto), HttpStatus.OK);
    }
}
