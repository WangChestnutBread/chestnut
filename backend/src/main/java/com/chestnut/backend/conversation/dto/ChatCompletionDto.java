package com.chestnut.backend.conversation.dto;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatCompletionDto {
    private String model;
    private List<ChatMessageDto> messages;
    private float temperature = 0.8f;
    private short max_tokens= 35;

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
