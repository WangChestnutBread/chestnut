package com.chestnut.backend.announcement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
/**
 * 공지사항 카테고리 정보를 담는 Data Transfer Object.
 * 공지사항 카테고리 Id, 카테고리명을 포함.
 */
@Getter
@ToString
@AllArgsConstructor
public class AnnouncementCategoryDto {
    private Byte announceCategoryId;
    private String announceCategoryName;
}
