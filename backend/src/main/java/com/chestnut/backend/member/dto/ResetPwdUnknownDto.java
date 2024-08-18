package com.chestnut.backend.member.dto;

import com.chestnut.backend.member.validation.annotation.Password;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResetPwdUnknownDto {
    private String loginId;
    @Password
    private String newPassword;
    private String newPasswordConfirm;
}
