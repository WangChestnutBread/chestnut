package com.chestnut.backend.conversation.dto;

import lombok.*;

import java.util.List;

/** 챗봇 요청을 위한 Data Transfer Object.
 * 챗봇 API와의 상호작용에 필요한 정보를 나타내며,
 * 모델, 메시지 목록, 응답 다양성(0-2), 최대 토큰 수를 포함.
 */
@Getter
// 기본 생성자의 접근 수준을 보호
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatCompletionDto {
    //사용할 모델의 이름
    private String model;
    // 전달할 메시지 목록(ChatMessageDto 객체로 표현)
    private List<ChatMessageDto> messages;
    // 생성되는 응답의 다양성을 조절하는 온도 값(기본값은 0.8)
    private float temperature = 0.8f;
    // 생성할 수 있는 최대 토큰 수(기본값은 35)
    private short max_tokens= 35;

    /**
     * 객체를 JSON 문자열로 변환하여 반환.
     *
     * @return 변환된 JSON 형태의 문자열
     */
    @Override
    public String toString() {
        return new StringBuilder()
                .append("{\"model\":\"").append(model)
                .append("\", \"messages\":").append(messages)
                .append(", \"temperature\":").append(temperature)
                .append(", \"max_tokens\":").append(max_tokens)
                .append("}").toString();
    }
}
