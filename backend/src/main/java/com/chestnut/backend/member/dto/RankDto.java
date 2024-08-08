package com.chestnut.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RankDto {
    private int rank;
    private String nickname;
    private LocalDateTime joinAt;
    private String avatarThumbnailUrl;
    private long reward;
}
