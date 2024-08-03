package com.chestnut.backend.member.dto;

import com.chestnut.backend.member.validation.annotation.Email;
import com.chestnut.backend.member.validation.annotation.Nickname;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ChangeInfoReqDTO {

    private String loginId;
    @Nickname
    private String nickname;
    private String memberName;
    @Email
    private String email;
    private LocalDate birthday;
}
