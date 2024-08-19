package com.chestnut.backend.member.service;

import com.chestnut.backend.avatar.entity.Avatar;
import com.chestnut.backend.avatar.repository.AvatarRepository;
import com.chestnut.backend.common.exception.*;
import com.chestnut.backend.common.service.RedisService;
import com.chestnut.backend.log.dto.AttendanceLogDto;
import com.chestnut.backend.log.repository.AttendanceLogRepository;
import com.chestnut.backend.member.controller.ChangeInfoReqDto;
import com.chestnut.backend.member.controller.FindIdReqDto;
import com.chestnut.backend.member.controller.SignupReqDto;
import com.chestnut.backend.member.dto.*;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MainMemberRepository;
import com.chestnut.backend.member.repository.MemberRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final AvatarRepository avatarRepository;
    private final RedisService redisService;

    private final MainMemberRepository mainMemberRepository;
    private final AttendanceLogRepository attendanceLogRepository;

    @Transactional
    public void signup(SignupReqDto signupReqDTO, HttpSession session) {

        String loginId = signupReqDTO.getLoginId();
        String checkDuplicationLoginId = (String) session.getAttribute("CheckLoginIdDuplication:");
        if (checkDuplicationLoginId == null) {
            throw new NotCheckDuplicationLoginId();
        }
        if (!checkDuplicationLoginId.equals(loginId)) {
            throw new LoginIdSessionException();
        }

        String nickname = signupReqDTO.getNickname();
        String checkDuplicationNickname = (String) session.getAttribute("CheckNicknameDuplication:");
        if (checkDuplicationNickname == null) {
            throw new NotCheckDuplicationNickname();
        }
        if (!checkDuplicationNickname.equals(nickname)) {
            throw new NicknameSessionException();
        }

        String email = signupReqDTO.getEmail();
        String checkDuplicationEmail = (String) session.getAttribute("CheckEmailDuplication:");
        String checkCodeEmail = (String) session.getAttribute("CheckEmailCode:signup:");

        if(checkDuplicationEmail == null) {
            throw new NotCheckDuplicationEmail();
        }

        if(checkCodeEmail == null) {
            throw new NotVerifiedEmailException();
        }

        if(!checkDuplicationEmail.equals(email) || !checkCodeEmail.equals(email)) {
            throw new EmailSessionException();
        }

        String password = signupReqDTO.getPassword();
        String checkPassword = signupReqDTO.getCheckPassword();
        if (!password.equals(checkPassword)) {
            throw new PasswordNotEqualException();
        }

        String codePwd = bCryptPasswordEncoder.encode(password);
        Avatar avatar = avatarRepository.findByAvatarId(1)
                .orElseThrow(AvatarNotFoundException::new);
        Member member = signupReqDTO.toEntity(codePwd, avatar);
        memberRepository.save(member);

        redisService.deleteData("CheckLoginIdDuplication:" + checkDuplicationLoginId);
        redisService.deleteData("CheckNicknameDuplication:" + checkDuplicationNickname);
        redisService.deleteData("CheckEmailDuplication:" + checkDuplicationEmail);
        redisService.deleteData("CheckEmailCode:signup:" + checkCodeEmail);

        session.invalidate();

    }

    @Transactional
    public FindIdResDto findId(FindIdReqDto findIdReqDTO) {

        String memberName = findIdReqDTO.getMemberName();
        String email = findIdReqDTO.getEmail();

        Member member = memberRepository.findByMemberName(memberName)
                .orElseThrow(MemberNotFoundException::new);

        if (!member.getEmail().equals(email)) {
            throw new IdEmailMismatchException();
        }

        return new FindIdResDto(member.getLoginId());
    }

    @Transactional
    public void checkNicknameDuplicate(String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new DataDuplicatedException();
        }
    }

    @Transactional
    public void checkLoginIdDuplicate(String loginId) {
        if (memberRepository.existsByLoginId(loginId)) {
            throw new DataDuplicatedException();
        }
    }

    @Transactional
    public void checkEmailDuplicate(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new DataDuplicatedException();
        }
    }

    @Transactional
    public void resetPwd(ResetPwdDTO resetPwdDTO) {
        String password = resetPwdDTO.getPassword();
        String newPassword = resetPwdDTO.getNewPassword();
        String newPasswordCheck = resetPwdDTO.getNewPasswordCheck();

        if (password.equals(newPassword)) {
            throw new NewPwdSameException();
        }
        if (!newPassword.equals(newPasswordCheck)) {
            throw new PasswordNotEqualException();
        }

        String loginId = resetPwdDTO.getLoginId();
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        String originalPassword = member.getPassword();
        if (!bCryptPasswordEncoder.matches(password, originalPassword)) {
            throw new PasswordNotEqualException();
        }

        String codePwd = bCryptPasswordEncoder.encode(resetPwdDTO.getNewPassword());

        member.changePassword(codePwd);
    }

    @Transactional
    public void resetPwdUnknown(ResetPwdUnknownDto resetPwdUnknownDTO) {
        String loginId = resetPwdUnknownDTO.getLoginId();
        String newPassword = resetPwdUnknownDTO.getNewPassword();
        String newPasswordConfirm = resetPwdUnknownDTO.getNewPasswordConfirm();

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        String password = member.getPassword();

        if (bCryptPasswordEncoder.matches(newPassword, password)) {
            throw new NewPwdSameException();
        }
        if (!newPassword.equals(newPasswordConfirm)) {
            throw new PasswordNotEqualException();
        }

        String codePwd = bCryptPasswordEncoder.encode(newPasswordConfirm);

        member.changePassword(codePwd);
    }

    @Transactional
    public GetInfoResDto getMemberInfo(String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        return GetInfoResDto.toDto(member);
    }

    @Transactional
    public void changeMemberInfo(String loginId, ChangeInfoReqDto changeInfoReqDTO) {

        if (!loginId.equals(changeInfoReqDTO.getLoginId())) {
            throw new IncorrectAccessException();
        }

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        member.changeInfo(changeInfoReqDTO);
    }

    @Transactional
    public void withdraw(String loginId) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        member.withdraw();

        redisService.deleteData("Refresh:"+loginId);
    }

    /**
     * 메인 페이지에 보일 멤버 정보 조회 메서드.
     *
     * @param loginId 조회할 사용자 아이디
     * @return MainMemberInfoDto 조회한 사용자 정보 DTO
     */
    @Transactional(readOnly = true)
    public MainMemberInfoDto getMainMemberInfo (String loginId){
        // 멤버 유효성 검사
        Member member = validateMember(loginId);
        return  mainMemberRepository.findMainMemberInfo(member.getMemberId());
    }

    /**
     * 사용자 출석 기록 조회 메서드.
     *
     * @param loginId 조회할 사용자 아이디
     * @param year 출석 조회 년도
     * @return AttendanceLogDto 출석 기록 DTO
     */
    @Transactional(readOnly = true)
    public AttendanceLogDto getAttendanceLog(String loginId, int year){
        // 멤버 유효성 검사
        Member member = validateMember(loginId);
        return new AttendanceLogDto(attendanceLogRepository.findByMemberIdandYear(member.getMemberId(), year));
    }

    /**
     * 멤버 조회 및 탈퇴 여부 검사 메서드.
     *
     * @param loginId 검사할 사용자 아이디
     * @return Member 검사한 멤버
     * @throws MemberNotFoundException 사용자를 찾을 수 없는 경우
     * @throws InvalidMemberException 탈퇴한 계정인 경우
     */
    public Member validateMember(String loginId) {
        Member member = memberRepository.findByLoginId(loginId).orElseThrow(MemberNotFoundException::new);
        if(member.isWithdraw()) throw new InvalidMemberException();
        return member;
    }

    /**
     * 멤버 조회 및 탈퇴, 관리자 여부 검사 메서드.
     *
     * @param loginId 검사할 사용자 아이디
     * @return Member 검사한 멤버
     * @throws AdminPermissionDeniedException 사용자가 관리자 권한이 없는 경우
     */
    public Member validateMemberForAdmin(String loginId) {
        Member member = validateMember(loginId);
        if(!member.isAdmin()) throw new AdminPermissionDeniedException();
        return member;
    }
}
