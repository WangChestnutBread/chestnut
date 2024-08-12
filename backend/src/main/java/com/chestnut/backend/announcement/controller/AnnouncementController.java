package com.chestnut.backend.announcement.controller;

import com.chestnut.backend.announcement.dto.AnnouncementDto;
import com.chestnut.backend.announcement.dto.AnnouncementListDto;
import com.chestnut.backend.announcement.service.AnnouncementService;
import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.member.dto.CustomMemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * 공지사항 관련 요청을 처리하는 컨트롤러 클래스.
 * 공지사항의 생성, 수정, 삭제 및 조회(목록, 상세내용)를 위한 엔드포인트를 제공.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/board/announcement")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    /**
     * 공지사항 목록 조회 메서드.
     *
     * @param page 현재 조회한 공지사항 페이지 넘버 (0부터 시작)
     * @param size 한번에 조회할 공지사항 개수
     * @param customMemberDetails 목록 요청한 사용자 정보
     * @return ResponseEntity<?> 공지사항 목록을 포함하는 ResponseEntity 객체
     */
    @GetMapping
    public ResponseEntity<?> getAnnouncementList(@RequestParam("page") Integer page,
                                                 @RequestParam("size") Integer size,
                                                 @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        // 요청한 사용자 아이디
        String loginId = customMemberDetails.getLoginId();
        AnnouncementListDto announcementListDto = announcementService.getAnnouncementList(loginId, page, size);
        return new ResponseEntity<>(new ResponseDto<>("200", announcementListDto), HttpStatus.OK);
    }

    /**
     * 공지사항 상세 내용 조회 메서드.
     *
     * @param announceId 상세 내용 확인할 공지사항 ID
     * @param customMemberDetails 요청한 사용자
     * @return ResponseEntity<?> 공지사항 상세 내용을 포함하는 ResponseEntity 객체
     */
    @GetMapping("/{announceId}")
    public ResponseEntity<?> getAnnouncementDetail(@PathVariable("announceId") Long announceId,
                                                   @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        // 요청한 사용자 아이디
        String loginId = customMemberDetails.getLoginId();
        AnnouncementDto announcementDto = announcementService.getAnnouncementDetail(loginId, announceId);
        return new ResponseEntity<>(new ResponseDto<>("200", announcementDto), HttpStatus.OK);
    }

    /**
     * 공지사항 작성 메서드.
     *
     * @param announcementDto 작성할 공지사항 DTO
     * @param customMemberDetails 작성 요청한 사용자 아이디
     * @return ResponseEntity<?> 작성 성공 여부를 나타내는 ResponseEntity 객체
     *         (HTTP 상태 코드 200과 함께 성공 메시지 code:200 포함)
     */
    @PostMapping
    public ResponseEntity<?> postAnnouncement(@RequestBody AnnouncementDto announcementDto,
                                              @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        // 요청한 사용자 아이디
        String loginId = customMemberDetails.getLoginId();
        announcementService.postAnnouncement(loginId ,announcementDto);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    /**
     * 공지사항 삭제 메서드.
     *
     * @param announceId 삭제할 공지사항 ID
     * @param customMemberDetails 삭제 요청한 사용자 아이디
     * @return ResponseEntity<?> 삭제 성공 여부를 나타내는 ResponseEntity 객체
     *         (HTTP 상태 코드 200과 함께 성공 메시지 code:200 포함)
     */
    @DeleteMapping("/{announceId}")
    public ResponseEntity<?> deleteAnnouncement(@PathVariable("announceId") Long announceId,
                                                @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        // 요청한 사용자 아이디
        String loginId = customMemberDetails.getLoginId();
        announcementService.deleteAnnouncement(loginId, announceId);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    /**
     * 공지사항 수정 메서드.
     *
     * @param announceId 수정할 공지시항 ID
     * @param announcementDto 수정할 공지사항 정보
     * @param customMemberDetails 수정 요청한 사용자 아이디
     * @return ResponseEntity<?> 수정 성공 여부를 나타내는 ResponseEntity 객체
     *         (HTTP 상태 코드 200과 함께 성공 메시지 code:200 포함)
     */
    @PutMapping("/{announceId}")
    public ResponseEntity<?> updateAnnouncement(@PathVariable("announceId") Long announceId,
                                                @RequestBody AnnouncementDto announcementDto,
                                                @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        // 요청한 사용자 아이디
        String loginId = customMemberDetails.getLoginId();
        announcementService.updateAnnouncement(loginId, announceId, announcementDto);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }
}
