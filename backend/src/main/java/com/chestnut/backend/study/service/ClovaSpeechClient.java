package com.chestnut.backend.study.service;

import com.chestnut.backend.common.exception.FileIOException;
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

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        try {
            body.add("media", new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            });
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(
                INVOKE_URL + "/recognizer/upload",
                requestEntity,
                String.class
        );
            return extractTextFromJsonResponse(response.getBody());
        }catch (IOException e) {
            throw new FileIOException();
        }
    }

    public String extractTextFromJsonResponse(String body){
        if(body.equals("")) return null;
        return body;
    }

}
