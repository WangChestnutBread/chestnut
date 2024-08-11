package com.chestnut.backend.member.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.common.exception.NotVerifiedEmailException;
import com.chestnut.backend.log.dto.AttendanceLogDto;
import com.chestnut.backend.member.dto.*;
import com.chestnut.backend.member.service.MailAuthService;
import com.chestnut.backend.member.service.MemberService;
import com.chestnut.backend.member.validation.annotation.Email;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * 멤버 관련 정보를 처리하는 컨트롤러 클래스.
 * 이 클래스는 멤버의 주요 정보, 출석 기록 조회,
 * 회원 가입, 이메일 확인,
 * 회원 정보 조회, 회원 정보 수정,
 * 아이디 찾기, 비밀번호 재설정,
 * 닉네임 중복 체크, 아이디 중복 체크,
 * 엔드포인트를 제공합니다.
 */
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
    public ResponseEntity<?> checkNicknameDuplicate(@RequestParam String nickname) {
        memberService.checkNicknameDuplicate(nickname);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @GetMapping("/check-loginId")
    public ResponseEntity<?> checkLoginIdDuplicate(@RequestParam String loginId) {
        memberService.checkLoginIdDuplicate(loginId);
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
    public ResponseEntity<?> resetPwdUknown(@Valid @RequestBody ResetPwdUnknownReqDTO resetPwdUnknownReqDTO,
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

    /**
     * 인증된 사용자 정보에 대한 메인페이지에 나타낼 멤버 정보를 조회.
     *
     * @param customMemberDetails 인증된 사용자 정보
     * @return ResponseEntity<?> 성공적으로 조회한 멤버 정보을 포함하는 ResponseEntity 객체
     */
    @GetMapping("/info/main")
    public ResponseEntity<?> getMainMemberInfo(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        // 인증된 사용자 ID로 멤버 정보 조회
        MainMemberInfoDto mainMemberInfoDto = memberService.getMainMemberInfo(customMemberDetails.getLoginId());
        return new ResponseEntity<>(new ResponseDto<>("200", mainMemberInfoDto), HttpStatus.OK);
    }

    @GetMapping("/withdraw")
    public ResponseEntity<?> withdraw(@AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        memberService.withdraw(customMemberDetails.getLoginId());
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @PostMapping("/email/code-request")
    public ResponseEntity<?> sendMail(@RequestBody SendMailReqDTO sendMailReqDTO) {
        mailAuthService.sendMail(sendMailReqDTO);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @PostMapping("/email/code-check")
    public ResponseEntity<?> checkMail(@RequestBody MailAuthDto mailAuthDto, HttpSession session){
        mailAuthService.verifyEmailCode(mailAuthDto);
        session.setAttribute("CheckEmailCode:", mailAuthDto.getEmail());
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    /**
     * 주어진 년도에 대한 사용자 출석 기록을 조회.
     *
     * @param year 출석 기록을 조회할 년도
     * @param customMemberDetails 인증된 사용자 정보
     * @return ResponseEntity<?> 성공적으로 조회한 출석 기록을 포함하는 ResponseEntity 객체
     */
    @GetMapping("/attendance")
    public ResponseEntity<?> getAttendanceLog(@RequestParam("year") int year,
                                 @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        // 인증된 사용자 ID로 멤버 정보 조회
        AttendanceLogDto attendanceLogDto = memberService.getAttendanceLog(customMemberDetails.getLoginId(), year);
        return new ResponseEntity<>(new ResponseDto<>("200", attendanceLogDto), HttpStatus.OK);
    }

}