package com.chestnut.backend.announcement.dto;

import com.chestnut.backend.announcement.entity.Announcement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AnnouncementDto {
    private Long announceId;
    private String title;
    private LocalDateTime updatedAt;
    private int hit;
    private String content;
    private Byte announceCategoryId;
    private String loginId;

    public AnnouncementDto(Long announceId, String title, LocalDateTime updatedAt, int hit, Byte announceCategoryId) {
        this.announceId = announceId;
        this.title = title;
        this.updatedAt = updatedAt;
        this.hit = hit;
        this.announceCategoryId = announceCategoryId;
    }

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
