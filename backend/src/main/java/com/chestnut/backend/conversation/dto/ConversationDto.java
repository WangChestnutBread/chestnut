package com.chestnut.backend.conversation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDto {
    private List<ChatMessageDto> messages;
    private short isTotalTokenLimit;
}
