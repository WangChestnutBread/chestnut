package com.chestnut.backend.conversation.dto;

import lombok.*;

/**
 * AI의 메시지를 표현하는  Data Transfer Object.
 * AI과 사용자 간의 메시지를 담고 있으며,
 * 역할(user 또는 system)과 내용으로 구성.
 */
@Getter
// 기본 생성자의 접근 수준을 보호
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatMessageDto {
    // 메시지를 발신한 역할 (예: "user" (사용자), "system" (AI))
    private String role;
    // 사용자가 입력한 텍스트 또는 AI의 응답 텍스트
    private String content;

    /**
     * 객체를 JSON 문자열로 변환하여 반환.
     *
     * @return 변환된 JSON 형태의 문자열
     */
    @Override
    public String toString() {
        return new StringBuilder()
                .append("{\"role\":\"").append(role)
                .append("\", \"content\":\"").append(content)
                .append("\"}").toString();
    }
}
