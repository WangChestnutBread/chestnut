package com.chestnut.backend.announcement.repository;

import com.chestnut.backend.announcement.dto.AnnouncementCategoryDto;
import com.chestnut.backend.announcement.entity.AnnouncementCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnnouncementCategoryRepository extends JpaRepository<AnnouncementCategory, Byte> {
    @Query("SELECT new com.chestnut.backend.announcement.dto.AnnouncementCategoryDto(ac.announceCategoryId, ac.announceCategoryName)" +
            "FROM AnnouncementCategory ac")
    List<AnnouncementCategoryDto> findAllDto();
}
