package com.chestnut.backend.conversation.service;

import com.chestnut.backend.common.exception.ChatApiFailException;
import com.chestnut.backend.conversation.dto.ChatCompletionDto;
import com.chestnut.backend.conversation.dto.ChatMessageDto;
import com.chestnut.backend.conversation.dto.ChatReposeJsonDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class OpenAIChatClient {
    @Value("${openai.secret}")
    private String SECRET;
    @Value("${openai.url.chat}")
    private String CHAT_URL;
    @Value("${openai.model}")
    private String MODEL;
    @Value("${openai.temperature}")
    private float TEMPERATURE;
    @Value("${openai.max-token}")
    private short MAX_TOKEN;

    private final RestTemplate restTemplate = new RestTemplate();

    public ChatReposeJsonDto sendMessage(List<ChatMessageDto> chatHistory) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(SECRET);
        headers.setContentType(MediaType.APPLICATION_JSON);
        ChatCompletionDto body = new ChatCompletionDto(MODEL, chatHistory, TEMPERATURE, MAX_TOKEN);
        HttpEntity<ChatCompletionDto> requestEntity = new HttpEntity<>(body, headers);
        log.debug("대화 태그 : 요청 형식 헤더 = "+requestEntity.getHeaders());
        log.debug("대화 태그 : 요청 형식 바디 = "+requestEntity.getBody());
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                CHAT_URL,
                requestEntity,
                String.class
            );
            log.debug("대화 태그 : ai 답변 response"+response);
            ObjectMapper om = new ObjectMapper();
            Map<String, Object> resultMap = om.readValue(response.getBody(), new TypeReference<>() {
            });
            log.debug("대화 태그 : ai 답변 response 역직렬화"+resultMap);
            String content = (String) ((Map<String, Object>) ((List<Map<String, Object>>) resultMap.get("choices")).get(0).get("message")).get("content");
            int totalToken = (int)((Map<String, Object>) resultMap.get("usage")).get("total_tokens");
            return new ChatReposeJsonDto(content,totalToken);
        } catch (Exception e) {
            log.debug("대화 태그 : gpt api 에러 = "+e.getMessage());
            throw new ChatApiFailException();
        }
    }
}
