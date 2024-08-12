package com.chestnut.backend.member.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.common.exception.NotVerifiedEmailException;
import com.chestnut.backend.log.dto.AttendanceLogDto;
import com.chestnut.backend.member.dto.*;
import com.chestnut.backend.member.service.MailAuthService;
import com.chestnut.backend.member.service.MemberService;
import com.chestnut.backend.member.validation.annotation.Email;
import com.chestnut.backend.member.validation.annotation.LoginId;
import com.chestnut.backend.member.validation.annotation.Nickname;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final MailAuthService mailAuthService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDTO signupReqDTO, HttpSession session) {
        memberService.signup(signupReqDTO, session);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestBody FindIdReqDTO findIdReqDTO) {
        FindIdResDTO findIdResDTO = memberService.findId(findIdReqDTO);
        return new ResponseEntity<>(new ResponseDto<>("200", findIdResDTO), HttpStatus.OK);
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<?> checkNicknameDuplicate(@Nickname @RequestParam String nickname, HttpSession session) {
        memberService.checkNicknameDuplicate(nickname);
        session.setAttribute("CheckNicknameDuplication:", nickname);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @GetMapping("/check-loginId")
    public ResponseEntity<?> checkLoginIdDuplicate(@LoginId @RequestParam String loginId, HttpSession session) {
        memberService.checkLoginIdDuplicate(loginId);
        session.setAttribute("CheckLoginIdDuplication:", loginId);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailDuplicate(@Email @RequestParam String email, HttpSession session) {
        memberService.checkEmailDuplicate(email);
        session.setAttribute("CheckEmailDuplication:", email);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @PostMapping("/reset-pwd/known")
    public ResponseEntity<?> resetPwd(@AuthenticationPrincipal CustomMemberDetails customMemberDetails, @Valid @RequestBody ResetPwdReqDTO resetPwdReqDTO) {
        ResetPwdDTO resetPwdDTO = new ResetPwdDTO(customMemberDetails.getLoginId(), resetPwdReqDTO);
        memberService.resetPwd(resetPwdDTO);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @PostMapping("/reset-pwd/unknown")
    public ResponseEntity<?> resetPwdUnknown(@Valid @RequestBody ResetPwdUnknownReqDTO resetPwdUnknownReqDTO,
                                            @SessionAttribute(name = "CheckEmailCode:", required = false) String authEmail) {
        if(authEmail == null || !resetPwdUnknownReqDTO.getEmail().equals(authEmail)) {
            throw new NotVerifiedEmailException();
        }
        memberService.resetPwdUnknown(resetPwdUnknownReqDTO.toDto());
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getInfo(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        GetInfoResDTO getInfoResDTO = memberService.getMemberInfo(customMemberDetails.getLoginId());
        return new ResponseEntity<>(new ResponseDto<>("200", getInfoResDTO), HttpStatus.OK);
    }

    @PostMapping("/info")
    public ResponseEntity<?> changeInfo(@AuthenticationPrincipal CustomMemberDetails customMemberDetails, @Valid @RequestBody ChangeInfoReqDTO changeInfoReqDTO) {
        memberService.changeMemberInfo(customMemberDetails.getLoginId(), changeInfoReqDTO);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @GetMapping("/info/main")
    public ResponseEntity<?> getMainMemberInfo(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        MainMemberInfoDto mainMemberInfoDto = memberService.getMainMemberInfo(customMemberDetails.getLoginId());
        return new ResponseEntity<>(new ResponseDto<>("200", mainMemberInfoDto), HttpStatus.OK);
    }

    @GetMapping("/withdraw")
    public ResponseEntity<?> withdraw(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        memberService.withdraw(customMemberDetails.getLoginId());
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @PostMapping("/email/code-request")
    public ResponseEntity<?> sendMail(@RequestBody SendMailReqDTO sendMailReqDTO) {
        mailAuthService.sendMail(sendMailReqDTO);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @PostMapping("/email/code-check")
    public ResponseEntity<?> checkMail(@RequestBody MailAuthDto mailAuthDto, HttpSession session) {
        mailAuthService.verifyEmailCode(mailAuthDto);
        session.setAttribute("CheckEmailCode:"+mailAuthDto.getPurpose()+":", mailAuthDto.getEmail());
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @GetMapping("/attendance")
    public ResponseEntity<?> getAttendanceLog(@RequestParam("year") int year,
                                 @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        AttendanceLogDto attendanceLogDto = memberService.getAttendanceLog(customMemberDetails.getLoginId(), year);
        return new ResponseEntity<>(new ResponseDto<>("200", attendanceLogDto), HttpStatus.OK);
    }

}