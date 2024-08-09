package com.chestnut.backend.conversation.dto;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatReposeJsonDto {
    private String aiMessage;
    private int totalTokens;
}
