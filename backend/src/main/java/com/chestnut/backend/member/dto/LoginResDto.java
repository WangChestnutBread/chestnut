package com.chestnut.backend.member.dto;

import lombok.Getter;

@Getter
public class LoginResDto {

    private String loginId;
    private boolean isAdmin;

    public LoginResDto(String loginId, boolean isAdmin) {
        this.loginId = loginId;
        this.isAdmin = isAdmin;
    }
}
