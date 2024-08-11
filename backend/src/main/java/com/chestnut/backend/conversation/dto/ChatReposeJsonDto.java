package com.chestnut.backend.conversation.dto;

import lombok.*;

/**
 * 챗봇의 응답을 표현하는 Data Transfer Object.
 * 챗봇이 생성한 메시지와 사용된 총 토큰 수를 포함.
 */
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatReposeJsonDto {
    // 챗봇이 생성한 메시지
    private String aiMessage;
    // 총 대화 사용된 총 토큰 수(API 호출 시 리소스 사용량을 측정)
    private int totalTokens;
}
