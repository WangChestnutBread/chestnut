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

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QnAService {

    private final QnARepository qnARepository;
    private final QnACategoryRepository qnACategoryRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public QnAResDTO getQnAList(String loginId, String role, Pageable pageable) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        if (role.equals("ROLE_ADMIN") && !member.isAdmin()) {
            throw new IncorrectAccessException(); //토큰 정보 - 관리자 / 현재 멤버 - 일반 유저
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

        QnAResDTO qna = new QnAResDTO(categories, qnaList);
        return qna;

    }

    @Transactional(readOnly = true)
    public QnADetailResDTO getQnADetail(String loginId, Long qnaId) {
        // 받아온 qnaId로 해당 QnA 찾고 -> QnA의 memberId와 loginId을 이용한 memberId가 같은지 여부 확인 -> 멤버 여부 확인! -> MemberNotFound
        // qnaId에 해당하는 qna 게시글이 있는지 확인 -> ArticleNotFound

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        QnA qna = qnARepository.findByqnaId(qnaId)
                .orElseThrow(ArticleNotFoundException::new);

        if(!qna.getMember().getLoginId().equals(loginId)) {
            //권한 없음
            throw new IncorrectAccessException();
        }

        QnADetailResDTO qnADetailResDTO = new QnADetailResDTO();
        qnADetailResDTO.from(qna);
        return qnADetailResDTO;

    }

    @Transactional
    public void writeQuestion(WriteQuestionDTO writeQuestionDTO) {

        // loginId로 member 찾고 -> memberId 을 활용하기
        Member member = memberRepository.findByLoginId(writeQuestionDTO.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        QnACategory qnACategory = qnACategoryRepository.findById(writeQuestionDTO.getQnaCategoryId())
                .orElseThrow(CategoryNotFoundException::new);

        QnA qna = writeQuestionDTO.toEntity(member, qnACategory);
        qnARepository.save(qna);
    }

    @Transactional
    public void writeAnswer(WriteAnswerDTO writeAnswerDTO) {

        // 관리자인지 여부 확인
        String loginId = writeAnswerDTO.getLoginId();
        String role = writeAnswerDTO.getRole();

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        if (!role.equals("ROLE_ADMIN") || !member.isAdmin()) {
            throw new AdminPermissionDeniedException();
        }

        // 질문이 존재하는지 확인
        Long qnaId = writeAnswerDTO.getQnaId();
        QnA qnA = qnARepository.findByqnaId(qnaId)
                .orElseThrow(ArticleNotFoundException::new);

        // 아직 답변하지 않은 글이 맞는지 확인 (이미 존재하면 안됨)
        if (qnA.isAnswer()) {
            throw new AlreadyAnsweredException();
        }

        String answer = writeAnswerDTO.getAnswer();
        qnA.writeAns(answer);
        qnARepository.save(qnA);

    }

}
