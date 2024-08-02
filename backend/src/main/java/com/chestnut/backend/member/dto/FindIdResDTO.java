package com.chestnut.backend.member.dto;

import lombok.Getter;

@Getter
public class FindIdResDTO {

    private String loginId;

    public FindIdResDTO(String loginId) {
        this.loginId = loginId;
    }
}
