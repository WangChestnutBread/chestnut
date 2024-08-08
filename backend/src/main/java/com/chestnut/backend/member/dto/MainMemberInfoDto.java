package com.chestnut.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class MainMemberInfoDto {
    private Byte avatarId;
    private String avatarName;
    private String avatarImgUrl;
    private Byte lowerLimit;
    private String nickname;
    private long reward;
    private int ranking;
    private Long studyId;
    private String word;
    private Byte chapterId;
    private String chapterName;
    private Short attendanceCount;
}
