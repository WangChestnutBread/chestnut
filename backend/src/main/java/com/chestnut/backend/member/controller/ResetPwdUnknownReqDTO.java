package com.chestnut.backend.member.controller;

import com.chestnut.backend.member.dto.ResetPwdUnknownDTO;
import com.chestnut.backend.member.validation.annotation.Password;
import lombok.Getter;

@Getter
public class ResetPwdUnknownReqDTO {
    private String loginId;
    private String email;
    @Password
    private String newPassword;
    private String newPasswordConfirm;

    public ResetPwdUnknownDTO toDto() {
        return new ResetPwdUnknownDTO(loginId, newPassword, newPasswordConfirm);
    }
}
