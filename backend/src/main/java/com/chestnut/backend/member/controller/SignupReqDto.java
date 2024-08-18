package com.chestnut.backend.member.controller;

import com.chestnut.backend.avatar.entity.Avatar;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.validation.annotation.Email;
import com.chestnut.backend.member.validation.annotation.LoginId;
import com.chestnut.backend.member.validation.annotation.Nickname;
import com.chestnut.backend.member.validation.annotation.Password;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignupReqDto {

    @LoginId
    private String loginId;
    @Password
    private String password;
    private String checkPassword;
    @Email
    private String email;
    @Nickname
    private String nickname;
    private String memberName;
    private LocalDate birthday;

    public Member toEntity(String codePassword, Avatar SignupAvatar) {
        return Member.builder()
                .loginId(loginId)
                .password(codePassword)
                .email(email)
                .nickname(nickname)
                .memberName(memberName)
                .birthday(birthday)
                .avatar(SignupAvatar)
                .build();
    }

}