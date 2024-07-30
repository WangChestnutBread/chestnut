package com.chestnut.backend.member.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.member.dto.SignupReqDTO;
import com.chestnut.backend.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDTO signupReqDTO) {
        memberService.signup(signupReqDTO);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

}