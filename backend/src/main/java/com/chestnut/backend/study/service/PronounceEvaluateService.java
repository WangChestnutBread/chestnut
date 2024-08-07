package com.chestnut.backend.study.service;

import com.chestnut.backend.common.exception.*;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.study.dto.PronunceEvaluateDto;
import com.chestnut.backend.study.util.StringComparator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class PronounceEvaluateService {

    private final MemberRepository memberRepository;
    private final ClovaSpeechClient clovaSpeechClient;

    public PronunceEvaluateDto pronounceEvaluate(String loginId, String answer, MultipartFile audioFile) {
        Member member = memberRepository.findByLoginId(loginId).orElseThrow(MemberNotFoundException::new);
        if(member.isWithdraw()) throw new InvalidMemberException();
        try {
            String sttResult = clovaSpeechClient.upload(audioFile);
            log.debug("STT 태그 : STT 결과 = "+ sttResult);
            if (sttResult.isEmpty()) throw new NullSTTException();
            StringComparator.ComparisonResult compareStrings = StringComparator.compareStrings(answer, sttResult);
            return new PronunceEvaluateDto(compareStrings.getIsPass(), sttResult, compareStrings.getAnswerMismatchIndices(), compareStrings.getInputMismatchIndices());
        }catch (FileIOException e){
            throw new FileIOException();
        }catch (SttFailException e){
            throw new SttFailException();
        }catch (NullSTTException e){
            throw new NullSTTException();
        }catch (Exception e){
            throw new UnknownException();
        }
    }
}
