package com.chestnut.backend.member.dto;

import com.chestnut.backend.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class GetInfoResDTO {

    private String loginId;
    private String email;
    private String memberName;
    private String nickname;
    private LocalDate birthday;

    public static GetInfoResDTO toDto(Member member) {
        return new GetInfoResDTO(member.getLoginId(), member.getEmail(), member.getMemberName(), member.getNickname(), member.getBirthday());
    }
}
