package com.chestnut.backend.announcement.service;

import com.chestnut.backend.announcement.dto.AnnouncementCategoryDto;
import com.chestnut.backend.announcement.dto.AnnouncementDto;
import com.chestnut.backend.announcement.dto.AnnouncementListDto;
import com.chestnut.backend.announcement.entity.Announcement;
import com.chestnut.backend.announcement.entity.AnnouncementCategory;
import com.chestnut.backend.announcement.repository.AnnouncementCategoryRepository;
import com.chestnut.backend.announcement.repository.AnnouncementRepository;
import com.chestnut.backend.common.exception.ArticleNotFoundException;
import com.chestnut.backend.common.exception.CategoryNotFoundException;
import com.chestnut.backend.common.exception.IncorrectAccessException;
import com.chestnut.backend.common.exception.InvalidFormatException;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 공지사항 관련 기능 제공 서비스 클래스.
 * 생성, 수정, 삭제, 조회(목록, 상세내용) 기능을 포함.
 */
@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final MemberService memberService;
    private final AnnouncementRepository announcementRepository;
    private final AnnouncementCategoryRepository announcementCategoryRepository;

    /**
     * 공지사항 목록 조회 메서드.
     *
     * @param loginId 목록 요청한 사용자
     * @param page 현재 조회한 공지사항 페이지 넘버 (0부터 시작)
     * @param size 한번에 조회할 공지사항 개수
     * @return AnnouncementListDto 카테고리 목록 & 공지사항 목록  DTO
     */
    @Transactional(readOnly = true)
    public AnnouncementListDto getAnnouncementList(String loginId, Integer page, Integer size) {
        // 조회할 공지사항 수가 1 미만일때 예외 발생
        if (size < 1)
            throw new InvalidFormatException();
        // 멤버 유효성 검사
        memberService.validateMember(loginId);
        // 모든 공지사항 카테고리 조회
        List<AnnouncementCategoryDto> announceCategory = announcementCategoryRepository.findAllDto();
        // 수정날짜 내림차순을 기준으로 공지사항 조회
        Pageable pageable = PageRequest.of(page, size, Sort.by("updatedAt").descending());
        Page<AnnouncementDto> announcementListPage = announcementRepository.findAllDto(pageable);
        return new AnnouncementListDto(announceCategory, announcementListPage);
    }

    /**
     * 공지사항 상세 내용 조회 메서드.
     *
     * @param loginId 요청한 사용자
     * @param announceId 상세 내용 확인할 공지사항 ID
     * @return AnnouncementDto 상세 확인할 공지사항 DTO
     * @throws ArticleNotFoundException 상세확인할 공지사항 조회 결과 없음
     */
    @Transactional
    public AnnouncementDto getAnnouncementDetail(String loginId, Long announceId){
        // 멤버 유효성 검사
        memberService.validateMember(loginId);
        // 상세 내용 확인할 공지사항 조회수 증가
        int updatedRows = announcementRepository.incrementHit(announceId);
        // 수정된 행이 없는 경우 예외 처리
        if(updatedRows < 1)
            throw new ArticleNotFoundException(); // 조회수 올릴 공지사항이 존재하지 않음
        // 상세 확인할 공지사항 조회
        Announcement announcement = announcementRepository.findByAnnounceId(announceId)
                .orElseThrow(ArticleNotFoundException::new);
        return AnnouncementDto.toDto(announcement);
    }

    /**
     * 공지사항 작성 메서드.
     *
     * @param loginId 작성 요청한 사용자 아이디
     * @param announcementDto 작성할 공지사항 DTO
     */
    @Transactional
    public void postAnnouncement(String loginId, AnnouncementDto announcementDto){
        // 수정 요청한 사용자 아이디와 공지사항 작성자 아이디 일치 확인
        validateSame(loginId, announcementDto.getLoginId());
        // 멤버 유효성 검사 : 관리자 권환 확인
        Member member = memberService.validateMemberForAdmin(announcementDto.getLoginId());
        // 공지사항카테고리 존재 여부 검사 후 해당 카테고리 정보 반환
        AnnouncementCategory announcementCategory = validateAnnouncementDto(announcementDto.getAnnounceCategoryId());
        // Announcement 엔티티 생성
        Announcement announcement = Announcement.builder()
                .title(announcementDto.getTitle())
                .content(announcementDto.getContent())
                .member(member)
                .announcementCategory(announcementCategory)
                .build();
        // 새로 작성한 공지사항 저장
        announcementRepository.save(announcement);
    }

    /**
     * 공지사항 삭제 메서드.
     *
     * @param loginId 삭제 요청한 사용자 아이디
     * @param announceId 삭제할 공지사항 ID
     * @throws ArticleNotFoundException 삭제할 공지사항 조회 결과 없음
     */
    @Transactional
    public void deleteAnnouncement(String loginId, Long announceId){
        // 멤버 유효성 검사 : 관리자 권환 확인
        memberService.validateMemberForAdmin(loginId);
        // 삭제할 공지사항 조회
        Announcement announcement = announcementRepository.findByAnnounceId(announceId)
                .orElseThrow(ArticleNotFoundException::new);
        // 공지사항 삭제
        announcementRepository.delete(announcement);
    }

    /**
     * 공지사항 수정 메서드.
     *
     * @param loginId 수정 요청한 사용자 아이디
     * @param announceId 수정 요청한 공지시항 ID
     * @param announcementDto 수정할 공지사항
     * @throws ArticleNotFoundException 수정할 공지사항의 기존 내용 조회 결과 없음
     */
    @Transactional
    public void updateAnnouncement(String loginId, Long announceId, AnnouncementDto announcementDto){
        // 수정 요청한 사용자 아이디와 공지사항 작성자 아이디 일치 확인
        validateSame(loginId, announcementDto.getLoginId());
        // 수정 요청한 공지사항 ID와 수정할 공지사항 ID 일치 확인
        validateSame(announceId, announcementDto.getAnnounceId());
        // 멤버 유효성 검사 : 관리자 권환 확인
        memberService.validateMemberForAdmin(announcementDto.getLoginId());
        // 수정할 공지사항카테고리 검사
        validateAnnouncementDto(announcementDto.getAnnounceCategoryId());
        // 공지사항 수정
        int updatedRows = announcementRepository.updateAnnouncement(
                announcementDto.getAnnounceCategoryId(),
                announcementDto.getTitle(),
                announcementDto.getContent(),
                announcementDto.getAnnounceId()
        );
        // 수정된 행이 없는 경우 예외 처리
        if( updatedRows < 1)
            throw new ArticleNotFoundException(); // 수정할 공지사항이 존재하지 않음
    }

    /**
     * 공지사항 양식(title, content, announceCategoryId) 검사 메서드.
     *
     * @param announcementCategoryId 검사할 공지사항 카테고리 Id
     * @return AnnouncementCategory 검사한 공지사항의 카테고리 Entity 반환
     * @throws CategoryNotFoundException 공지사항 카테고리 ID가 존재하지 않을 경우
     */
    private AnnouncementCategory validateAnnouncementDto(Byte announcementCategoryId) {
        // 공지 사항 카테고리 존재 여부 확인
        return announcementCategoryRepository.findById(announcementCategoryId)
                .orElseThrow(CategoryNotFoundException::new);
    }

    /**
     * 두 값이 동일한지 확인하고, 다를 경우 예외를 던지는 메서드.
     *
     * @param value1 첫 번째 값 (String 또는 Long)
     * @param value2 두 번째 값 (String 또는 Long)
     * @throws IncorrectAccessException 두 값이 다를 경우 발생
     */
    private void validateSame(Object value1, Object value2) {
        if (!value1.equals(value2)) {
            throw new IncorrectAccessException();
        }
    }
}