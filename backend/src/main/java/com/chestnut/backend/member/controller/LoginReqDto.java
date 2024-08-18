package com.chestnut.backend.member.controller;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginReqDto {

    private String loginId;
    private String password;
}
