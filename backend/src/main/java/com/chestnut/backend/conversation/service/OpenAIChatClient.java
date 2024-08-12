package com.chestnut.backend.conversation.service;

import com.chestnut.backend.common.exception.ChatApiFailException;
import com.chestnut.backend.common.exception.ChatApiRefusalException;
import com.chestnut.backend.conversation.dto.ChatCompletionDto;
import com.chestnut.backend.conversation.dto.ChatMessageDto;
import com.chestnut.backend.conversation.dto.ChatReposeJsonDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

/**
 * AI 대화 통신 제공 서비스 클래스.
 */
@Service
@Slf4j
public class OpenAIChatClient {
    // 통신 설정 변수
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

    /**
     * AI 자유대화 응답 요청 메서드.
     *
     * @param chatHistory 지금까지의 대화 기록
     * @return ChatReposeJsonDto 대화 응답 결과 DTO
     */
    public ChatReposeJsonDto sendMessage(List<ChatMessageDto> chatHistory) {
        // 요청 Entity 설정
        HttpEntity<ChatCompletionDto> requestEntity = createRequestEntity(chatHistory);
        log.debug("대화 태그 : 요청 형식 헤더 = "+requestEntity.getHeaders());
        log.debug("대화 태그 : 요청 형식 바디 = "+requestEntity.getBody());
        // 대답 요청
        ResponseEntity<String> response = sendRequest(requestEntity);
        log.debug("대화 태그 : ai 답변 response"+response);
        // json에서 결과 DTO 추출 후 반환
        return extractDtoFromJsonResponse(response);
    }

    /**
     * AI 대화 요청 Entity를 생성하는 메서드.
     *
     * @param chatHistory AI에게 제공할 대화 기록
     * @return HttpEntity<ChatCompletionDto> 요청 객체
     */
    private HttpEntity<ChatCompletionDto> createRequestEntity(List<ChatMessageDto> chatHistory) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(SECRET);
        headers.setContentType(MediaType.APPLICATION_JSON);
        ChatCompletionDto body = new ChatCompletionDto(MODEL, chatHistory, TEMPERATURE, MAX_TOKEN);
        return new HttpEntity<>(body, headers);
    }

    /**
     * AI 대화 API에 요청을 보내는 메서드.
     *
     * @param requestEntity 요청 보낸 HttpEntity 객체
     * @return  ResponseEntity<ChatCompletionDto> 요청에 따른 응답 객체
     * @throws ChatApiFailException AI 대화 API 통신 실패
     */
    private ResponseEntity<String> sendRequest(HttpEntity<ChatCompletionDto> requestEntity) {
        try {
            return restTemplate.postForEntity(
                    CHAT_URL,
                    requestEntity,
                    String.class
            );
        } catch (RestClientException e) {
            throw new ChatApiFailException();
        }
    }

    /**
     * JSON 응답에서 AI 대답을 추출하는 메서드.
     *
     * @param response 응답 ResponseEntity 객체
     * @return ChatReposeJsonDto 추출된 대답을 담는 DTO
     * @throws ChatApiRefusalException AI가 대답을 거부했을 경우
     */
    public ChatReposeJsonDto extractDtoFromJsonResponse(ResponseEntity<String> response) {
        try {
            Map<String, Object> resultMap = new ObjectMapper().readValue(response.getBody(), new TypeReference<>() {});
            log.debug("대화 태그 : ai 답변 response 역직렬화"+resultMap);
            // AI 대화 거절 여부 확인
            String isRefusal = (String) ((Map<String, Object>) ((List<Map<String, Object>>) resultMap.get("choices")).get(0).get("message")).get("refusal");
            if(isRefusal != null)
                throw new ChatApiRefusalException();
            // AI 대답 추출
            String content = (String) ((Map<String, Object>) ((List<Map<String, Object>>) resultMap.get("choices")).get(0).get("message")).get("content");
            // 지금까지 대화로 사용된 토큰 추출
            int totalToken = (int)((Map<String, Object>) resultMap.get("usage")).get("total_tokens");
            log.debug("대화 태그 : 현재 총 토큰 수 "+totalToken);
            return new ChatReposeJsonDto(content, totalToken);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (ChatApiRefusalException e) {
            throw new ChatApiRefusalException();
        }
    }

}
