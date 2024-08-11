package com.chestnut.backend.announcement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 공지사항 목록 정보를 담는 Data Transfer Object.
 * 공지사항 카테고리와 페이지화된 공지사항 목록을 포함.
 */
@Getter
@ToString
@AllArgsConstructor
public class AnnouncementListDto {
    // 공지사항 카테고리 목록
    private List<AnnouncementCategoryDto> announceCategory;
    // 페이지화된 공지사항 목록
    private Page<AnnouncementDto> announcementListPage;
}
