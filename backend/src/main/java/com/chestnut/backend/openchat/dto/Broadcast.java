package com.chestnut.backend.openchat.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Broadcast {

    String nickname;
    String content;
    LocalDateTime sendAt;

    public Broadcast(ChatLog chatLog) {
        this.nickname = chatLog.getNickname();
        this.content = chatLog.getContent();
        this.sendAt = chatLog.getSendAt();
    }
}
