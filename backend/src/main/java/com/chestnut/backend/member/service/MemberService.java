package com.chestnut.backend.member.service;

import com.chestnut.backend.common.exception.DatabaseException;
import com.chestnut.backend.common.exception.PasswordNotEqualException;
import com.chestnut.backend.common.exception.UnknownException;
import com.chestnut.backend.member.dto.SignupReqDTO;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void signup(SignupReqDTO signupReqDTO){

        //회원가입 안 되는 경우
        //1. 비밀번호 양식 이상함 -> 애노테이션으로 해결
        //2. 비밀전호, 확인용 비밀번호 불일치
        //이거 다 됐으면 try catch문으로 repo에 넣기

        String password = signupReqDTO.getPassword();
        String checkPassword = signupReqDTO.getCheckPassword();
        if(!password.equals(checkPassword)){
            throw new PasswordNotEqualException("604");
        }

        try{
            Member member = signupReqDTO.toEntity();
            memberRepository.save(member);
        } catch (DataAccessException e){
            throw new DatabaseException("704");
        } catch (Exception e){
            throw new UnknownException("299");
        }


    }

}
