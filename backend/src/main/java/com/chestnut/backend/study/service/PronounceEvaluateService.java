package com.chestnut.backend.study.service;

import com.chestnut.backend.member.service.MemberService;
import com.chestnut.backend.study.dto.PronunceEvaluateDto;
import com.chestnut.backend.study.util.StringComparator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * 발음 평가 서비스를 제공하는 클래스.
 * 클로바 음성 인식 API를 사용하여 음성을 텍스트로 변환한 후
 * 정답과 비교하여 발음 평가 결과를 반환합니다.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class PronounceEvaluateService {

    private final ClovaSpeechClient clovaSpeechClient;
    private final MemberService memberService;

    /**
     * 사용자의 발음을 평가하는 메서드.
     *
     * @param loginId 평가할 사용자 아이디
     * @param answer 정답 문자열
     * @param audioFile 사용자가 발음한 음성 파일
     * @return PronunceEvaluateDto 발음 평가 결과 DTO
     */
    public PronunceEvaluateDto pronounceEvaluate(String loginId, String answer, String sttPonounce, MultipartFile audioFile) {
        // 멤버 유효성 검사
        memberService.validateMember(loginId);
        // 음성 파일을 클로바 음성 인식 API에 업로드하여 STT 결과를 가져옴
        String sttResult = clovaSpeechClient.upload(audioFile);
        log.debug("STT 태그 : STT 결과 = "+ sttResult);
        // // 정답 문자열과 STT 결과를 비교 후 발음 평가 결과 DTO 생성 및 반환
        return StringComparator.compareStrings(answer, sttPonounce, sttResult);
    }
}
