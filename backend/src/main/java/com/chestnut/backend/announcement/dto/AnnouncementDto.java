package com.chestnut.backend.announcement.dto;

import com.chestnut.backend.announcement.entity.Announcement;
import com.chestnut.backend.common.validation.annotation.Content;
import com.chestnut.backend.common.validation.annotation.Title;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

/**
 * 공지사항 정보를 담는 Data Transfer Object.
 * 공지사항 Id, 제목, 수정일자, 조회수, 내용, 카테고리 Id, 작성자 아이디를 포함.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AnnouncementDto {
    private Long announceId;
    @Title
    private String title;
    private LocalDateTime updatedAt;
    private int hit;
    @Content
    private String content;
    private Byte announceCategoryId;
    private String loginId;

    /**
     * 공지사항 수정시 사용할 DTO 생성자.
     *
     * @param announceId 공지사항 Id
     * @param title 공지사항 제목
     * @param updatedAt 공지사항 수정일자
     * @param hit 공지사항 조회수
     * @param announceCategoryId 공지사항 카테고리 Id
     */
    public AnnouncementDto(Long announceId, String title, LocalDateTime updatedAt, int hit, Byte announceCategoryId) {
        this.announceId = announceId;
        this.title = title;
        this.updatedAt = updatedAt;
        this.hit = hit;
        this.announceCategoryId = announceCategoryId;
    }

    /**
     * Announcement Entity를 AnnouncementDto로 변환 메서드.
     *
     * @param announcement 변환할 Entity
     * @return AnnouncementDto 변환된 DTO 형태
     */
    public static AnnouncementDto toDto(Announcement announcement){
        return new AnnouncementDto(announcement.getAnnounceId(),
                                    announcement.getTitle(),
                                    announcement.getUpdatedAt(),
                                    announcement.getHit(),
                                    announcement.getContent(),
                                    announcement.getAnnouncementCategory().getAnnounceCategoryId(),
                                    announcement.getMember().getLoginId());
    }
}
