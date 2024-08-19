package com.chestnut.backend.qna.service;

import com.chestnut.backend.common.exception.*;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.qna.dto.*;
import com.chestnut.backend.qna.entity.QnA;
import com.chestnut.backend.qna.entity.QnACategory;
import com.chestnut.backend.qna.repository.QnACategoryRepository;
import com.chestnut.backend.qna.repository.QnARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QnAService {

    private final QnARepository qnARepository;
    private final QnACategoryRepository qnACategoryRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public QnAResDto getQnAList(String loginId, String role, Pageable pageable) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        if (role.equals("ROLE_ADMIN") && !member.isAdmin()) {
            throw new IncorrectAccessException();
        }

        if (role.equals("ROLE_USER") && member.isAdmin()) {
            throw new IncorrectAccessException();
        }

        List<QnACategory> categories = qnACategoryRepository.findAll();

        Page<QnA> qnaList = null;
        if (member.isAdmin()) {
            qnaList = qnARepository.findAll(pageable);
        }

        if (!member.isAdmin()) {
            String nickname = member.getNickname();
            qnaList = qnARepository.findByMemberNickname(nickname, pageable);
        }

        QnAResDto qna = new QnAResDto(categories, qnaList);
        return qna;
    }

    @Transactional(readOnly = true)
    public QnADetailResDto getQnADetail(String loginId, Long qnaId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        QnA qna = qnARepository.findByqnaId(qnaId)
                .orElseThrow(ArticleNotFoundException::new);

        if (!qna.getMember().getLoginId().equals(loginId) && !member.isAdmin()) {
            throw new IncorrectAccessException();
        }

        return QnADetailResDto.from(qna);
    }

    @Transactional
    public void writeQuestion(WriteQuestionDto writeQuestionDTO) {
        Member member = memberRepository.findByLoginId(writeQuestionDTO.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        QnACategory qnACategory = qnACategoryRepository.findById(writeQuestionDTO.getQnaCategoryId())
                .orElseThrow(CategoryNotFoundException::new);

        QnA qna = writeQuestionDTO.toEntity(member, qnACategory);
        qnARepository.save(qna);
    }

    @Transactional
    public void writeAnswer(WriteAnswerDto writeAnswerDTO) {
        String loginId = writeAnswerDTO.getLoginId();
        String role = writeAnswerDTO.getRole();

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        if (!role.equals("ROLE_ADMIN") || !member.isAdmin()) {
            throw new AdminPermissionDeniedException();
        }

        Long qnaId = writeAnswerDTO.getQnaId();
        QnA qnA = qnARepository.findByqnaId(qnaId)
                .orElseThrow(ArticleNotFoundException::new);

        if (qnA.isAnswer()) {
            throw new AlreadyAnsweredException();
        }

        String answer = writeAnswerDTO.getAnswer();
        qnA.writeAns(answer);
        qnARepository.save(qnA);
    }

}
