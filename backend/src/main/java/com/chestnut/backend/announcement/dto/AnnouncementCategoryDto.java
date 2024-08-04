package com.chestnut.backend.announcement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class AnnouncementCategoryDto {
    private Byte announceCategoryId;
    private String announceCategoryName;
}
