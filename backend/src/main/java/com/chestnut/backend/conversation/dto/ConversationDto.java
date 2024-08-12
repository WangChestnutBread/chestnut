package com.chestnut.backend.conversation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

/**
 * 대화 내용을 표현하는  Data Transfer Object.
 * AI과의 대화에서 발생한 메시지 목록과
 * 총 토큰 제한 여부를 포함.
 */
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDto {
    // 대화에서 주고받은 메시지 목록(각 메시지는 ChatMessageDto 객체로 표현)
    private List<ChatMessageDto> messages;
    // 총 토큰 제한 여부(1: 토큰 제한 걸림, 0: 제한안 걸림)
    private short isTotalTokenLimit;
}
