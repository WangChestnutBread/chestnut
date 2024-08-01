package com.chestnut.backend.member.dto;

import com.chestnut.backend.member.entity.Member;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SessionDTO {

    private String loginId;
    private String role;

    public Member toEntity(){

        if(role.equals("ROLE_ADMIN")){
            return Member.builder()
                    .loginId(loginId)
                    .isAdmin(true)
                    .build();
        } else {
            return Member.builder()
                    .loginId(loginId)
                    .isAdmin(false)
                    .build();
        }

    }
}
