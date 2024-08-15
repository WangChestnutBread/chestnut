package com.chestnut.backend.log.service;

import com.chestnut.backend.avatar.entity.Avatar;
import com.chestnut.backend.avatar.repository.AvatarRepository;
import com.chestnut.backend.common.exception.InvalidMemberException;
import com.chestnut.backend.common.exception.MemberNotFoundException;
import com.chestnut.backend.common.exception.StudyNotFoundException;
import com.chestnut.backend.log.entity.*;
import com.chestnut.backend.log.repository.*;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import com.chestnut.backend.member.service.MemberService;
import com.chestnut.backend.study.entity.Study;
import com.chestnut.backend.study.repository.StudyRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LogService {

    private final StudyLogRepository studyLogRepository;
    private final MemberRepository memberRepository;
    private final StudyRepository studyRepository;
    private final AttendanceLogRepository attendanceLogRepository;
    private final LogTypeRepository logTypeRepository;
    private final RewardTypeRepository rewardTypeRepository;
    private final RewardLogRepository rewardLogRepository;
    private final AvatarRepository avatarRepository;

    @Transactional
    public void saveStudyLog(String loginId, Long studyId, boolean isPass) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);
        if(member.isWithdraw()) throw new InvalidMemberException();
        Study study = studyRepository.findByStudyIdWithChapter(studyId)
                .orElseThrow(StudyNotFoundException::new);
        int todayCount = studyLogRepository.findRecentLogByMemberId(member.getMemberId(), PageRequest.of(0, 1))
                .stream()
                .findFirst()
                .orElse(0);

        //todayCount == 0 이면 출석 로그 찍기 -> 출석 보상 지급
        //todayCount == 9 이면 학습 보상 지급
        if (todayCount == 0) {
            saveAttendanceLog(member);
        } else if (todayCount == 9) {
            getReward(member,(byte)3,(byte)3);
        }

        boolean passRecord = isPass || studyLogRepository
                .findPassRecord(member.getMemberId(), study.getStudyId(), PageRequest.of(0, 1))
                .stream()
                .findFirst()
                .orElse(false);

        StudyLog studyLog = StudyLog.builder()
                .member(member)
                .chapter(study.getChapter())
                .study(study)
                .todayCount(todayCount + 1)
                .isPass(isPass)
                .passRecord(passRecord)
                .build();
        studyLogRepository.save(studyLog);

        //member의 recentStudy 바꿔주기
        member.recentStudy(study); //더티체킹으로 인해 자동으로 업데이트됨
    }

    private void saveAttendanceLog(Member member) {
        //어제 로그가 있는지
        LocalDateTime start = LocalDateTime.now().minusDays(1).toLocalDate().atStartOfDay();
        LocalDateTime end = LocalDateTime.now().toLocalDate().atStartOfDay().minusNanos(1);
        short attendanceCount = attendanceLogRepository.findYesterdayLog(start, end, member)
                .orElse((short) 0);

        //출석보상 지급
        getReward(member,(byte)1,(byte)1);
        //attendanceCount == 4일 때 연속출석보상 지급
        if (attendanceCount == (short)4) {
            getReward(member,(byte)2,(byte)1);
        }

        AttendanceLog attendanceLog = AttendanceLog.builder()
                .member(member)
                .attendanceCount((short) (attendanceCount + 1))
                .build();
        attendanceLogRepository.save(attendanceLog);
    }


    /**
     * 리워드 로그를 기록하고 멤버의 리워드를 업데이트하는 메서드.
     * 주의: 이 메서드는 반드시 @Transactional이 붙은 메서드 내에서 호출되어야 한다.
     *
     * @param member 리워드를 받을 멤버
     * @param rewardTypeId 리워드 타입 ID
     *        1: 출석보상, 2: 연속출석보상, 3: 문제풀이보상, 4: 챕터완료보상, 5: 자유대화보상
     * @param logTypeId 로그 타입 ID
     *        1: 출석로그, 2: AI대화로그, 3: 문제로그
     * @throws IllegalArgumentException 유효하지 않은 인자 입력
     */
    @Transactional
    public void getReward(Member member, byte rewardTypeId, byte logTypeId) {
        RewardType rewardType = rewardTypeRepository.findByRewardTypeId(rewardTypeId);
        LogType logType = logTypeRepository.findByLogTypeId(logTypeId);

        if (rewardType == null || logType == null) {
            throw new IllegalArgumentException("유효하지 않은 인자 입력");
        }

        rewardLogRepository.save(new RewardLog(member, logType, rewardType));

        //member 업데이트
        byte rewardAmount = rewardType.getRewardAmount();
        member.addReward(rewardAmount); //트랜잭션 내에서 엔티티 변경 사항은 자동으로 db에 반영(더티체킹)
        changeAvatar(member); //아바타 업데이트
    }

    /**
     * 리워드 로그를 기록하고 멤버의 리워드를 업데이트하는 메서드.
     * 주의: 이 메서드는 반드시 @Transactional이 붙은 메서드 내에서 호출되어야 한다.
     * @param member
     * @throws IllegalArgumentException 유효하지 않은 인자 입력
     */
    private void changeAvatar(Member member) {
        Byte avatarId = member.getAvatar().getAvatarId(); //N+1문제 발생하지 않음
        long reward = member.getReward();
        long limit = getLimit(avatarId);
        if (reward >= limit) {
            Avatar newAvatar = avatarRepository.findByAvatarId(avatarId + 1)
                    .orElseThrow(IllegalArgumentException::new);
            member.updateAvatar(newAvatar);
        }
    }

    private long getLimit(byte id) {
        return switch (id) {
            case (byte) 1 -> 10L;
            case (byte) 2 -> 23L;
            case (byte) 3 -> 39L;
            case (byte) 4 -> 58L;
            case (byte) 5 -> 80L;
            case (byte) 6 -> 105L;
            default -> Long.MAX_VALUE;
        };
    }

    public List<String> getStudiedWordList(String loginId, int year, int month, int day) {
        Member member = memberRepository.findByLoginId(loginId)
            .orElseThrow(MemberNotFoundException::new);
        if(member.isWithdraw()) throw new InvalidMemberException();
        LocalDate date = LocalDate.of(year,month,day);
        return studyLogRepository.getStudiedWordAtTheDay(member, date);
    }
}
