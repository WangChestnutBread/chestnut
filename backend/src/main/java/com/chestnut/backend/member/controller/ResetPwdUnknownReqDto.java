package com.chestnut.backend.member.controller;

import com.chestnut.backend.member.dto.ResetPwdUnknownDto;
import com.chestnut.backend.member.validation.annotation.Password;
import lombok.Getter;

@Getter
public class ResetPwdUnknownReqDto {
    private String loginId;
    private String email;
    @Password
    private String newPassword;
    private String newPasswordConfirm;

    public ResetPwdUnknownDto toDto() {
        return new ResetPwdUnknownDto(loginId, newPassword, newPasswordConfirm);
    }
}
