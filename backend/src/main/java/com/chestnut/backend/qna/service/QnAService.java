package com.chestnut.backend.qna.service;

import com.chestnut.backend.common.exception.ArticleNotFoundException;
import com.chestnut.backend.common.exception.IncorrectAccessException;
import com.chestnut.backend.common.exception.MemberNotFoundException;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.qna.dto.QnADetailResDTO;
import com.chestnut.backend.qna.dto.QnAListDTO;
import com.chestnut.backend.qna.dto.QnAResDTO;
import com.chestnut.backend.qna.entity.QnA;
import com.chestnut.backend.qna.entity.QnACategory;
import com.chestnut.backend.qna.repository.QnACategoryRepository;
import com.chestnut.backend.qna.repository.QnARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QnAService {

    private final QnARepository qnARepository;
    private final QnACategoryRepository qnACategoryRepository;
    private final MemberRepository memberRepository;

    public QnAResDTO getQnAList(String loginId, String role, Pageable pageable) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        if (role.equals("ROLE_ADMIN") && !member.isAdmin()) {
            throw new IncorrectAccessException(); //토큰 정보 - 관리자 / 현재 멤버 - 일반 유저
        }

        if (role.equals("ROLE_USER") && member.isAdmin()) {
            throw new IncorrectAccessException();
        }

        // 검증 끝

        List<QnACategory> categories = qnACategoryRepository.findAll();

        List<QnAListDTO> qnaList = new ArrayList<>();
        Page<QnA> lists = null;

        if (member.isAdmin()) {
            //관리자 -> 전체 조회
//            try{
                lists = qnARepository.findAll(pageable);
//            }


        }

        if (!member.isAdmin()) {
            lists = qnARepository.findAllByMemberMemberId(member.getMemberId(), pageable);
        }

        for (QnA qna : lists) {
            QnACategory category = qna.getQnaCategory();
            Member qnaMember = qna.getMember();

            qnaList.add(new QnAListDTO(qna.getQnaId(), category.getQnaCategoryId(), category.getQnaCategoryName(),
                    qna.getTitle(), qnaMember.getNickname(), qna.getCreatedAt(), qna.isAnswer()));

           /* qnaList.add(new QnAListDTO(qna.getQnaId(), qna.getQnaCategory().getQnaCategoryId(), qna.getQnaCategory().getQnaCategoryName(),
                    qna.getTitle(), qna.getMember().getNickname(), qna.getCreatedAt(), qna.isAnswer()));*/
        }

        QnAResDTO qna = new QnAResDTO(categories, qnaList, pageable);
        return qna;

    }

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
}
