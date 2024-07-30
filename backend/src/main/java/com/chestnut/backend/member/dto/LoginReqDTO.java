package com.chestnut.backend.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginReqDTO {

    private String loginId;
    private String password;
}
