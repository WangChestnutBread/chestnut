package com.chestnut.backend.announcement.repository;

import com.chestnut.backend.announcement.dto.AnnouncementDto;
import com.chestnut.backend.announcement.entity.Announcement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    @Query(value = "select new com.chestnut.backend.announcement.dto." +
            "AnnouncementDto(a.announceId, a.title, a.updatedAt, a.hit, a.announcementCategory.announceCategoryId) " +
            "from Announcement a",
            countQuery = "SELECT COUNT(a) FROM Announcement a")
    Page<AnnouncementDto> findAllDto(Pageable pageable);

    Optional<Announcement> findByAnnounceId(Long announceId);

    @Modifying
    @Query("UPDATE Announcement a SET a.hit = a.hit + 1 WHERE a.announceId = :announceId")
    int incrementHit(@Param("announceId") Long announceId);

    @Modifying
    @Query("UPDATE Announcement a " +
            "SET a.announcementCategory.announceCategoryId = :announceCategoryId, " +
                "a.title = :title, a.content = :content, " +
                "a.updatedAt = CURRENT_TIMESTAMP " +
            "WHERE a.announceId = :announceId")
    int updateAnnouncement(@Param("announceCategoryId") Byte announceCategoryId,
                           @Param("title") String title,
                           @Param("content") String content,
                           @Param("announceId") Long announceId);
}
