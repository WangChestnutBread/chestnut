package com.chestnut.backend.conversation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDto {
    private String userMessage;
    private String chatbotMessage;
    private short isTotalTokenLimit;
}
