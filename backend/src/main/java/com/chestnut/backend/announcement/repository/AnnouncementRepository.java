package com.chestnut.backend.announcement.repository;

import com.chestnut.backend.announcement.dto.AnnouncementDto;
import com.chestnut.backend.announcement.entity.Announcement;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * 공지사항 엔티티에 대한 데이터 접근 객체.
 * 이 인터페이스는 공지사항 정보를 CRUD 작업을 수행하는 메서드를 정의.
 */
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    /**
     * 페이지화된 공지사항 목록을 조회.
     *
     * @param pageable 페이지 요청 정보를 포함하는 객체
     * @return Page<AnnouncementDto> 페이지화된 공지사항 DTO 리스트
     * @throws DataAccessException DB 접근, CRUD 실패할 경우 발생
     */
    @Query(value = """
            select new com.chestnut.backend.announcement.dto.
            AnnouncementDto(a.announceId, a.title, a.updatedAt, a.hit, a.announcementCategory.announceCategoryId)
            from Announcement a
            """,
            countQuery = "SELECT COUNT(a) FROM Announcement a")
    Page<AnnouncementDto> findAllDto(Pageable pageable);

    /**
     * 주어진 공지사항 ID에 해당하는 공지사항을 조회.
     *
     * @param announceId 조회할 공지사항의 ID
     * @return Optional<Announcement> 공지사항 객체가 포함된 Optional
     */
    Optional<Announcement> findByAnnounceId(Long announceId);

    /**
     * 주어진 공지사항 ID의 공지사항 조회 수를 1 증가.
     *
     * @param announceId 조회 수를 증가시킬 공지사항의 ID
     * @return int 업데이트된 행의 수
     * @throws DataAccessException DB 접근, CRUD 실패할 경우 발생
     */
    @Modifying
    @Query("UPDATE Announcement a SET a.hit = a.hit + 1 WHERE a.announceId = :announceId")
    int incrementHit(@Param("announceId") Long announceId);

    /**
     * 주어진 공지사항 ID의 공지사항을 업데이트.
     *
     * @param announceCategoryId 공지사항 카테고리 ID
     * @param title 공지사항 제목
     * @param content 공지사항 내용
     * @param announceId 업데이트할 공지사항의 ID
     * @return int 업데이트된 행의 수
     * @throws DataAccessException DB 접근, CRUD 실패할 경우 발생
     */
    @Modifying
    @Query("""
            UPDATE Announcement a
            SET a.announcementCategory.announceCategoryId = :announceCategoryId,
                a.title = :title, a.content = :content,
                a.updatedAt = CURRENT_TIMESTAMP
            WHERE a.announceId = :announceId
            """)
    int updateAnnouncement(@Param("announceCategoryId") Byte announceCategoryId,
                           @Param("title") String title,
                           @Param("content") String content,
                           @Param("announceId") Long announceId);
}
