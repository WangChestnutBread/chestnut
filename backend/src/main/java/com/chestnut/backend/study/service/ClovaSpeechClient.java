package com.chestnut.backend.study.service;

import com.chestnut.backend.common.exception.FileIOException;
import com.chestnut.backend.common.exception.SttFailException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Slf4j
public class ClovaSpeechClient {

    @Value("${clova.speech.secret}")
    private String SECRET;
    @Value("${clova.speech.invoke-url}")
    private String INVOKE_URL;

    private final RestTemplate restTemplate = new RestTemplate();

    public String upload(MultipartFile file) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("X-CLOVASPEECH-API-KEY", SECRET);
        // Multipart 요청을 위한 Body 생성
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        try {
            // 파일 데이터를 포함한 ByteArrayResource 생성
            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    // 파일 이름 제공
                    return file.getOriginalFilename();
                }
            };

            // 요청 본문 구성
            body.add("media", resource);
            body.add("params", "{\"language\":\"ko-KR\",\"completion\":\"sync\"}");

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(
                    INVOKE_URL + "/recognizer/upload",
                    requestEntity,
                    String.class
            );
            log.debug("STT 태그 : 클로바 응답 body : "+response.getBody());
            return extractTextFromJsonResponse(response.getBody());
        } catch (IOException e) {
            throw new FileIOException();
        } catch (Exception ex){
            log.debug("STT 태그 : STT 실패(에러) : "+ ex.getMessage());
            throw new SttFailException();
        }
    }

    public String extractTextFromJsonResponse(String body) {
        return new JSONObject(body).optString("text");
    }
}
