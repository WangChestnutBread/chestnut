package com.chestnut.backend.member.dto;

import com.chestnut.backend.member.controller.ResetPwdReqDTO;
import com.chestnut.backend.member.entity.Member;
import lombok.Getter;

@Getter
public class ResetPwdDTO {

    private String loginId;
    private String password;
    private String newPassword;
    private String newPasswordCheck;

    public ResetPwdDTO(String loginId, ResetPwdReqDTO resetPwdReqDTO) {
        this.loginId = loginId;
        this.password = resetPwdReqDTO.getPassword();
        this.newPassword = resetPwdReqDTO.getNewPassword();
        this.newPasswordCheck = resetPwdReqDTO.getNewPasswordCheck();
    }

    public Member toEntity(Member member, String codePwd) {
        return Member.builder()
                .memberId(member.getMemberId())
                .loginId(member.getLoginId())
                .email(member.getEmail())
                .password(codePwd)
                .nickname(member.getNickname())
                .memberName(member.getMemberName())
                .isAdmin(member.isAdmin())
                .avatar(member.getAvatar())
                .reward(member.getReward())
                .joinAt(member.getJoinAt())
                .isWithdraw(member.isWithdraw())
                .ranking(member.getRanking())
                .build();
    }

}
