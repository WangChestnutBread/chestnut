package com.chestnut.backend.member.controller;

import lombok.Getter;

@Getter
public class SendMailReqDto {
    private String email;
    private String purpose;
}
