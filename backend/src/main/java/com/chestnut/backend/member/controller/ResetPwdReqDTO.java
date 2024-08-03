package com.chestnut.backend.member.controller;

import com.chestnut.backend.member.validation.annotation.Password;
import lombok.Getter;

@Getter
public class ResetPwdReqDTO {

    private String password;
    @Password
    private String newPassword;
    private String newPasswordCheck;
}
