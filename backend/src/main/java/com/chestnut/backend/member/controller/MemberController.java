package com.chestnut.backend.member.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.member.dto.FindIdResDTO;
import com.chestnut.backend.member.dto.SignupReqDTO;
import com.chestnut.backend.member.dto.FindIdReqDTO;
import com.chestnut.backend.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDTO signupReqDTO) {
        memberService.signup(signupReqDTO);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestBody FindIdReqDTO findIdReqDTO){
        FindIdResDTO findIdResDTO = memberService.findId(findIdReqDTO);
        return new ResponseEntity<>(new ResponseDto<>("200", findIdResDTO), HttpStatus.OK);
    }

    @GetMapping("/test")
    public String test(){
        return "test";
    }

}