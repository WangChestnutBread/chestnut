package com.chestnut.backend.study.service;

import com.chestnut.backend.common.exception.SttFailException;
import com.chestnut.backend.study.dto.PronunceEvaluateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PronunceEvaluateService {

    private final ClovaSpeechClient clovaSpeechClient;

    public PronunceEvaluateDto pronunceEvaluate(String correctAnswer, MultipartFile audioFile) {
        String sttResult = clovaSpeechClient.upload(audioFile);
        if(sttResult==null) throw new SttFailException();
        System.out.println(sttResult);
        return new PronunceEvaluateDto();
    }
}
