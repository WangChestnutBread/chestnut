package com.chestnut.backend.member.dto;

import com.chestnut.backend.member.controller.ResetPwdReqDto;
import lombok.Getter;

@Getter
public class ResetPwdDTO {

    private String loginId;
    private String password;
    private String newPassword;
    private String newPasswordCheck;

    public ResetPwdDTO(String loginId, ResetPwdReqDto resetPwdReqDTO) {
        this.loginId = loginId;
        this.password = resetPwdReqDTO.getPassword();
        this.newPassword = resetPwdReqDTO.getNewPassword();
        this.newPasswordCheck = resetPwdReqDTO.getNewPasswordCheck();
    }

}
