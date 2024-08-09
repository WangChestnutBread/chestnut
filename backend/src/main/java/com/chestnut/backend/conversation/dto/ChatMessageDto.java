package com.chestnut.backend.conversation.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatMessageDto {
    private String role;
    private String content;
    @Override
    public String toString() {
        return new StringBuilder()
                .append("{\"role\":\"").append(role)
                .append("\", \"content\":\"").append(content)
                .append("\"}").toString();
    }
}
