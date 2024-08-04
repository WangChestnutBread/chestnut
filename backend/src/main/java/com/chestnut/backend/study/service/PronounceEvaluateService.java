package com.chestnut.backend.study.service;

import com.chestnut.backend.common.exception.SttFailException;
import com.chestnut.backend.study.dto.PronunceEvaluateDto;
import com.chestnut.backend.study.util.StringComparator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PronounceEvaluateService {

    private final ClovaSpeechClient clovaSpeechClient;

    public PronunceEvaluateDto pronounceEvaluate(String answer, MultipartFile audioFile) {
        String sttResult = clovaSpeechClient.upload(audioFile);
        if(sttResult.isEmpty()) throw new SttFailException();
        StringComparator.ComparisonResult compareStrings = StringComparator.compareStrings(answer, sttResult);
        return new PronunceEvaluateDto(compareStrings.getIsPass(), sttResult, compareStrings.getAnswerMismatchIndices(), compareStrings.getInputMismatchIndices());
    }
}
