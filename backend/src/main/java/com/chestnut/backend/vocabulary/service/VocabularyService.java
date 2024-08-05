package com.chestnut.backend.vocabulary.service;

import com.chestnut.backend.common.exception.MemberNotFoundException;
import com.chestnut.backend.common.exception.NotFoundException;
import com.chestnut.backend.common.exception.StudyNotFoundException;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.study.entity.Study;
import com.chestnut.backend.study.repository.StudyRepository;
import com.chestnut.backend.vocabulary.dto.VocabularyDto;
import com.chestnut.backend.vocabulary.entity.Vocabulary;
import com.chestnut.backend.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyService {

    private final VocabularyRepository vocabularyRepository;
    private final MemberRepository memberRepository;
    private final StudyRepository studyRepository;

    public void addVocabulary(Long studyId, String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);
        Study study = studyRepository.findByStudyId(studyId)
                .orElseThrow(StudyNotFoundException::new);
        vocabularyRepository.save(new Vocabulary(member, study));
    }

    public void deleteVocabulary(Long studyId, String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);
        Study study = studyRepository.findByStudyId(studyId)
                .orElseThrow(StudyNotFoundException::new);
        Vocabulary vocabulary = vocabularyRepository.findByMemberAndStudy(member, study)
                .orElseThrow(NotFoundException::new);
        vocabularyRepository.delete(vocabulary);
    }

    public Page<VocabularyDto> getVocabularyList(String loginId, Byte chapterId, Integer page, Integer size) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);
        Pageable pageable = PageRequest.of(page, size, Sort.by("study.studyId").ascending());
        if (chapterId == (byte)0) {
            return vocabularyRepository.findByMember(member, pageable);
        } else {
            return vocabularyRepository.findByMemberAndChapter(member, chapterId, pageable);
        }
        //orElse()와 orElseGet의 차이 -> 전자는 객체를 인자로 받고 후자는 함수형 인터페이스를 인자로 받는다
        //orElse는 값을 생성하여 orElseGet보다 비용이 크므로 최대한 사용을 피해야 한다
    }


}
