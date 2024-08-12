package com.chestnut.backend.study.service;

import com.chestnut.backend.common.exception.NullSTTException;
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
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 클로바 음성 인식 API와 상호작용하는 클라이언트 서비스 클래스.
 * 이 클래스는 클로바 음성 인식 API에 파일을 업로드하고,
 * 응답으로부터 텍스트를 추출하는 기능을 제공.
 */
@Service
@Slf4j
public class ClovaSpeechClient {

    // 클로바 음성 인식 API 키
    @Value("${clova.speech.secret}")
    private String SECRET;
    // 클로바 음성 인식 API 호출 URL
    @Value("${clova.speech.invoke-url}")
    private String INVOKE_URL;
    // REST 요청을 위한 RestTemplate 인스턴스
    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * 음성 파일을 클로바 음성 인식 API에 업로드하는 메서드.
     *
     * @param file 업로드할 음성 파일
     * @return String 인식된 텍스트 결과
     * @throws SttFailException STT 통신 실패할 경우
     */
    public String upload(MultipartFile file) throws SttFailException {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = createRequestEntity(file);
        log.debug("STT 태그 : 클로바 요청 body : %s".formatted(requestEntity.getBody()));
        ResponseEntity<String> response = sendRequest(requestEntity);
        log.debug("STT 태그 : 클로바 응답 body : %s".formatted(response.getBody()));
        // JSON 응답에서 텍스트 추출 후 반환
        return extractTextFromJsonResponse(response.getBody());
    }

    /**
     * Clova STT 요청 Entity를 생성하는 메서드.
     *
     * @param file STT 수행할 녹음 파일
     * @return HttpEntity<MultiValueMap<String, Object>> 요청 객체
     * @throws IOException 녹음 파일 IO 관련시 발생할 수 있는 예외
     */
    private HttpEntity<MultiValueMap<String, Object>> createRequestEntity(MultipartFile file) {
        // Header 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("X-CLOVASPEECH-API-KEY", SECRET); // API 키 설정

        // Multipart 요청을 위한 Body 생성
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        try{
            // 파일 데이터를 포함한 ByteArrayResource 생성
            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    // 파일 이름 제공
                    return file.getOriginalFilename();
                }
            };
            // 요청 본문 구성
            body.add("media", resource); // 요청 본문에 파일 추가
            body.add("params", "{\"language\":\"ko-KR\",\"completion\":\"sync\"}"); // 요청 본문에 파라미터 추가
            return new HttpEntity<>(body, headers);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

    /**
     * 클로바 STT에 요청을 보내는 메서드.
     *
     * @param requestEntity 요청 보낸 HttpEntity 객체
     * @return  ResponseEntity<String> 요청에 따른 응답 객체
     * @throws SttFailException STT 통신 실패할 경우
     */
    private ResponseEntity<String> sendRequest(HttpEntity<MultiValueMap<String, Object>> requestEntity) {
        try {
            // 클로바 음성 인식 API에 POST 요청
            return restTemplate.postForEntity(
                    INVOKE_URL + "/recognizer/upload",
                    requestEntity,
                    String.class
            );
        } catch (RestClientException e) {
            log.debug("STT 태그 : 에러 : "+ e.getMessage());
            throw new SttFailException();
        }
    }

    /**
     * JSON 응답에서 텍스트를 추출하는 메서드.
     *
     * @param body JSON 형식의 응답 본문
     * @return 추출된 텍스트
     * @throws NullSTTException STT 결과가 비어 있는 경우
     */
    public String extractTextFromJsonResponse(String body) {
        // JSON에서 'test' 키 값(텍스트) 추출
        String sttResult = new JSONObject(body).optString("text");
        // STT 결과가 비어 있는 경우 예외 발생
        if (sttResult.isEmpty())
            throw new NullSTTException();
        return sttResult;
    }


}
