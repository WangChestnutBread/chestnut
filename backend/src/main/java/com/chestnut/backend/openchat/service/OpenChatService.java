package com.chestnut.backend.openchat.service;

import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.openchat.dto.ChatLog;
import com.chestnut.backend.openchat.dto.Input;
import com.chestnut.backend.openchat.repository.OpenChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OpenChatService {

    private final OpenChatRepository openChatRepository;

    public ChatLog saveToLog(Input input, String loginId, String nickname) {
        ChatLog chatLog = new ChatLog(input, loginId, nickname);
        return openChatRepository.save(chatLog);
    }
}
