package com.chestnut.backend.member.dto;

import lombok.Getter;

@Getter
public class SendMailReqDTO {
    private String email;
    private String purpose;
}
