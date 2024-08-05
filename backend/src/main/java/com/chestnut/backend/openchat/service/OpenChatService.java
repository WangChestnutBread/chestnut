package com.chestnut.backend.openchat.service;

import com.chestnut.backend.openchat.dto.ChatLog;
import com.chestnut.backend.openchat.dto.Input;
import com.chestnut.backend.openchat.repository.OpenChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OpenChatService {

    private final OpenChatRepository openChatRepository;

    public ChatLog saveToLog(Input input) {
        ChatLog chatLog = new ChatLog(input);
        return openChatRepository.save(chatLog);
    }
}
