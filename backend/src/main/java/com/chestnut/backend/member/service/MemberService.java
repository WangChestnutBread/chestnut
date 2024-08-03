package com.chestnut.backend.member.service;

import com.chestnut.backend.avatar.entity.Avatar;
import com.chestnut.backend.avatar.repository.AvatarRepository;
import com.chestnut.backend.common.exception.*;
import com.chestnut.backend.member.dto.*;
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

    private final AvatarRepository avatarRepository;

    @Transactional
    public void signup(SignupReqDTO signupReqDTO) {

        String password = signupReqDTO.getPassword();
        String checkPassword = signupReqDTO.getCheckPassword();
        if (!password.equals(checkPassword)) {
            throw new PasswordNotEqualException();
        }

        try {
            String codePwd = bCryptPasswordEncoder.encode(password);
            Avatar avatar = avatarRepository.findByAvatarId(1)
                    .orElseThrow(AvatarNotFoundException::new);

            Member member = signupReqDTO.toEntity(codePwd, avatar);
            memberRepository.save(member);
        } catch (DataAccessException e) {
            throw new DatabaseException();
        } catch (Exception e) {
            throw new UnknownException();
        }

    }

    @Transactional
    public FindIdResDTO findId(FindIdReqDTO findIdReqDTO) {

        String memberName = findIdReqDTO.getMemberName();
        String email = findIdReqDTO.getEmail();

        Member member = memberRepository.findByMemberName(memberName)
                .orElseThrow(MemberNotFoundException::new);

        if (!member.getEmail().equals(email)) {
            throw new IdEmailMismatchException();
        }

        return new FindIdResDTO(member.getLoginId());
    }

    @Transactional
    public void checkNicknameDuplicate(String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new DataDuplicatedException();
        }
    }

    @Transactional
    public void checkLoginIdDuplicate(String loginId) {
        if (memberRepository.existsByLoginId(loginId)) {
            throw new DataDuplicatedException();
        }
    }

    @Transactional
    public void resetPwd(ResetPwdDTO resetPwdDTO) {

        String password = resetPwdDTO.getPassword();
        String newPassword = resetPwdDTO.getNewPassword();
        String newPasswordCheck = resetPwdDTO.getNewPasswordCheck();

        //1. 기존 비번 - 새로운 비번 일치
        if (password.equals(newPassword)) {
            throw new NewPwdSameException();
        }

        //2. 새로운 비번 - 새로운 비번 확인용 일치 여부
        if (!newPassword.equals(newPasswordCheck)) {
            throw new PasswordNotEqualException();
        }

        //3. loginId로 해당 멤버 찾고 -> 그 멤버의 비번과 입력한 현재 비번이 일치한지 확인
        String loginId = resetPwdDTO.getLoginId();
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        String originalPassword = member.getPassword();
        if (!bCryptPasswordEncoder.matches(password, originalPassword)) {
            throw new PasswordNotEqualException();
        }

        String codePwd = bCryptPasswordEncoder.encode(resetPwdDTO.getNewPassword());

        member.changePassword(codePwd);
    }

    @Transactional
    public GetInfoResDTO getMemberInfo(String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        return GetInfoResDTO.toDto(member);
    }

    @Transactional
    public void changeMemberInfo(String loginId, ChangeInfoReqDTO changeInfoReqDTO) {

        if(!loginId.equals(changeInfoReqDTO.getLoginId())){
            throw new IncorrectAccessException();
        }

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        member.changeInfo(changeInfoReqDTO);
    }

}
