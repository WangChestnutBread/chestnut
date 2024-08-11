package com.chestnut.backend.announcement.repository;

import com.chestnut.backend.announcement.dto.AnnouncementCategoryDto;
import com.chestnut.backend.announcement.entity.AnnouncementCategory;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * 공지사항카테고리 엔티티에 대한 데이터 접근 객체.
 * 이 인터페이스는 공지사항카테고리 정보를 CRUD 작업을 수행하는 메서드를 정의.
 */
public interface AnnouncementCategoryRepository extends JpaRepository<AnnouncementCategory, Byte> {
    /**
     * 모든 공지사항 카테고리 목록을 조회.
     *
     * @return List<AnnouncementCategoryDto> 공지사항 카테고리 DTO 리스트를 반환
     * @throws DataAccessException DB 접근, CRUD 실패할 경우 발생
     *
     */
    @Query("""
            SELECT new com.chestnut.backend.announcement.dto.AnnouncementCategoryDto(ac.announceCategoryId, ac.announceCategoryName)
            FROM AnnouncementCategory ac
            """)
    List<AnnouncementCategoryDto> findAllDto();
}
