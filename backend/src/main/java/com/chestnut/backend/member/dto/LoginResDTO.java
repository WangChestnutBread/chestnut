package com.chestnut.backend.member.dto;

import lombok.Getter;

@Getter
public class LoginResDTO {

    private String loginId;
    private boolean isAdmin;

    public LoginResDTO(String loginId, boolean isAdmin) {
        this.loginId = loginId;
        this.isAdmin = isAdmin;
    }
}
