package com.chestnut.backend.member.dto;

import lombok.Getter;

@Getter
public class FindIdResDto {

    private String loginId;

    public FindIdResDto(String loginId) {
        this.loginId = loginId;
    }
}
