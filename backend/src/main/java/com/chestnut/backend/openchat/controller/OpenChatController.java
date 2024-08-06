package com.chestnut.backend.openchat.controller;

import com.chestnut.backend.openchat.dto.Broadcast;
import com.chestnut.backend.openchat.dto.ChatLog;
import com.chestnut.backend.openchat.dto.Input;
import com.chestnut.backend.openchat.service.OpenChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class OpenChatController {

    private final OpenChatService openChatService;

    @MessageMapping("/chat-center") // /app/chat-center로 보내면 여기로 옴
    @SendTo("/topic/chat-room") // /topic/chat-room 구독자들에게 전송
    public Broadcast openChatting(@Payload Input input, @Header("nickname") String nickname, Principal principal) {
        String loginId = principal.getName();
        ChatLog chatLog = openChatService.saveToLog(input, loginId, nickname);
        return new Broadcast(chatLog);
    }


}
