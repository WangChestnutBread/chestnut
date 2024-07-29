package com.chestnut.backend.member.dto;

import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.validation.Password;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class SignupReqDTO {

    private String loginId;
    //    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+\\[\\]{}|;':\",./<>?~`-]{8,}$",
//            message = "비밀번호는 8자 이상이어야 하며, 영문 대소문자, 숫자, 또는 특수기호(공백 제외)만 포함해야 합니다.")
    @Password
    private String password;
    private String checkPassword;
    private String email;
    private String nickname;
    private String memberName;
    private LocalDate birthday;

    public Member toEntity(){
        return new Member(loginId, password, email, nickname, memberName, birthday);
    }

}