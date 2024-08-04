package com.chestnut.backend.announcement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@ToString
@AllArgsConstructor
public class AnnouncementListDto {
    private List<AnnouncementCategoryDto> announceCategory;
    private Page<AnnouncementDto> announcementListPage;
}
