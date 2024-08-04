package com.chestnut.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MailAuthDto {
    private String email;
    private String code;
    private String purpose;
}
