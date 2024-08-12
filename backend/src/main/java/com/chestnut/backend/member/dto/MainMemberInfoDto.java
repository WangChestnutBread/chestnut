package com.chestnut.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * 주요 멤버 정보를 담는 Data Transfer Object.
 * 멤버의 아바타 정보, 보상, 랭킹, 학습 정보,
 * 및 출석 기록 등을 포함.
 */
@Getter
@ToString
@AllArgsConstructor
public class MainMemberInfoDto {
    // 사용자 아바타 정보
    private Byte avatarId;
    private String avatarName;
    private String avatarImgUrl;
    private Byte lowerLimit;
    // 사용자 정보
    private String nickname;
    private long reward;
    private int ranking;
    // 사용자 최근 학습 정보
    private Long studyId;
    private String word;
    private Byte chapterId;
    private String chapterName;
    private Short attendanceCount;
}
