package com.chestnut.backend.member.service;

import com.chestnut.backend.avatar.entity.Avatar;
import com.chestnut.backend.avatar.repository.AvatarRepository;
import com.chestnut.backend.common.exception.*;
import com.chestnut.backend.common.service.RedisService;
import com.chestnut.backend.log.dto.AttendanceLogDto;
import com.chestnut.backend.log.repository.AttendanceLogRepository;
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
    public void signup(SignupReqDTO signupReqDTO, HttpSession session) {

        String loginId = signupReqDTO.getLoginId();
        System.out.println(loginId);
        String checkDuplicationLoginId = (String) session.getAttribute("CheckLoginIdDuplication:");
        System.out.println("checkDuplicationLoginId:"+checkDuplicationLoginId);
        if (checkDuplicationLoginId == null) {
            // loginId 중복 검사 안함
            throw new NotCheckDuplicationLoginId();
        }
        if (!checkDuplicationLoginId.equals(loginId)) {
            // 입력한 loginId와 중복 검사 한 loginId가 다름 ( = 중복 검사 후에 입력한 아이디 바꾼 경우)
            throw new LoginIdSessionException();
        }

        String nickname = signupReqDTO.getNickname();
        String checkDuplicationNickname = (String) session.getAttribute("CheckNicknameDuplication:");
        if (checkDuplicationNickname == null) {
            // 닉네임 중복 검사 안함
            throw new NotCheckDuplicationNickname();
        }
        if (!checkDuplicationNickname.equals(nickname)) {
            // 입력한 닉네임과 중복 검사 한 닉네임이 다름 ( = 중복 검사 후에 입력한 닉네임 바꾼 경우)
            throw new NicknameSessionException();
        }

        //DTO에서의 이메일 꺼내기 -> session에서 중복 검사 이메일과 같은지 확인 / 코드 검사 이메일과 같은지 확인
        String email = signupReqDTO.getEmail();
        String checkDuplicationEmail = (String) session.getAttribute("CheckEmailDuplication:");
        String checkCodeEmail = (String) session.getAttribute("CheckEmailCode:");

        if(checkDuplicationEmail == null) {
            // email 중복 검사 안함
            throw new NotCheckDuplicationEmail();
        }

        if(checkCodeEmail == null) {
            // email 인증 번호 작성 안함
            throw new NotVerifiedEmailException();
        }

        if(!checkDuplicationEmail.equals(email) || !checkCodeEmail.equals(email)) {
            // 입력한 이메일과 중복 검사 및 인증 한 이메일이 다름 ( = 검사 후에 입력한 이메일 바꾼 경우)
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

        //체크 필요
        redisService.deleteData("CheckLoginIdDuplication:" + checkDuplicationLoginId);
        redisService.deleteData("CheckNicknameDuplication:" + checkDuplicationNickname);
        redisService.deleteData("CheckEmailDuplication: " +checkDuplicationEmail);
        redisService.deleteData("CheckEmailCode: "+checkCodeEmail);

    }

    @Transactional
    public FindIdResDTO findId(FindIdReqDTO findIdReqDTO) {

        String memberName = findIdReqDTO.getMemberName();
        String email = findIdReqDTO.getEmail();

        Member member = memberRepository.findByMemberName(memberName)
                .orElseThrow(MemberNotFoundException::new);

        if (!member.getEmail().equals(email)) {
            throw new IdEmailMismatchException();
        }

        return new FindIdResDTO(member.getLoginId());
    }

    @Transactional
    public void checkNicknameDuplicate(String nickname) {
        //유효성 검사 + 중복 검사
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

        //1. 기존 비번 - 새로운 비번 일치
        if (password.equals(newPassword)) {
            throw new NewPwdSameException();
        }

        //2. 새로운 비번 - 새로운 비번 확인용 일치 여부
        if (!newPassword.equals(newPasswordCheck)) {
            throw new PasswordNotEqualException();
        }

        //3. loginId로 해당 멤버 찾고 -> 그 멤버의 비번과 입력한 현재 비번이 일치한지 확인
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
    public void resetPwdUnknown(ResetPwdUnknownDTO resetPwdUnknownDTO) {
        String loginId = resetPwdUnknownDTO.getLoginId();
        String newPassword = resetPwdUnknownDTO.getNewPassword();
        String newPasswordConfirm = resetPwdUnknownDTO.getNewPasswordConfirm();

        //로그인 아이디로 해당 멤버 찾고
        //기존 패스워드와 새로운 패스워드가 같은지 여부 체크 하고
        //패스워드끼리 같은지 체크 하고

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        String password = member.getPassword();

        if (bCryptPasswordEncoder.matches(newPassword, password)) {
            throw new NewPwdSameException();
        }

        if (!newPassword.equals(newPasswordConfirm)) {
            throw new PasswordNotEqualException();
        }

        //newPassword로 업데이트 하기
        String codePwd = bCryptPasswordEncoder.encode(newPasswordConfirm);

        member.changePassword(codePwd);
    }

    @Transactional
    public GetInfoResDTO getMemberInfo(String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        return GetInfoResDTO.toDto(member);
    }

    @Transactional
    public void changeMemberInfo(String loginId, ChangeInfoReqDTO changeInfoReqDTO) {

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
