package com.chestnut.backend.member.service;

import com.chestnut.backend.common.exception.*;
import com.chestnut.backend.member.dto.FindIdReqDTO;
import com.chestnut.backend.member.dto.FindIdResDTO;
import com.chestnut.backend.member.dto.SignupReqDTO;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void signup(SignupReqDTO signupReqDTO) {

        String password = signupReqDTO.getPassword();
        String checkPassword = signupReqDTO.getCheckPassword();
        if (!password.equals(checkPassword)) {
            throw new PasswordNotEqualException("604");
        }

        try {
            String codePwd = bCryptPasswordEncoder.encode(password);
            Member member = signupReqDTO.toEntity(codePwd);
            memberRepository.save(member);
        } catch (DataAccessException e) {
            throw new DatabaseException("704");
        } catch (Exception e) {
            throw new UnknownException("299");
        }

    }

    @Transactional
    public FindIdResDTO findId(FindIdReqDTO findIdReqDTO) {

        String memberName = findIdReqDTO.getMemberName();
        String email = findIdReqDTO.getEmail();

        Member findByName = memberRepository.findByMemberName(memberName)
                .orElseThrow(()-> new MemberNotFoundException("714"));

        if(!findByName.getEmail().equals(email)){
            throw new IdEmailMismatchException("712");
        }

        FindIdResDTO findIdResDTO = new FindIdResDTO(findByName.getLoginId());
        return findIdResDTO;
    }

}
