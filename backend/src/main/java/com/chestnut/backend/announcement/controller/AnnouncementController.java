package com.chestnut.backend.announcement.controller;

import com.chestnut.backend.announcement.dto.AnnouncementDto;
import com.chestnut.backend.announcement.dto.AnnouncementListDto;
import com.chestnut.backend.announcement.service.AnnouncementService;
import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.common.exception.IncorrectAccessException;
import com.chestnut.backend.common.exception.InvalidFormatException;
import com.chestnut.backend.member.dto.CustomMemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board/announcement")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @GetMapping
    public ResponseEntity<?> getAnnouncementList(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestParam("page") Integer page,
            @RequestParam("size") Integer size){
        if (size < 1) throw new InvalidFormatException();
        String loginId = customMemberDetails.getLoginId();
        AnnouncementListDto announcementListDto = announcementService.getAnnouncementList(loginId, page, size);
        return new ResponseEntity<>(new ResponseDto<>("200", announcementListDto), HttpStatus.OK);
    }

    @GetMapping("/{announceId}")
    public ResponseEntity<?> getAnnouncementDetail(@PathVariable("announceId") Long announceId,
                                      @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        String loginId = customMemberDetails.getLoginId();
        AnnouncementDto announcementDto = announcementService.getAnnouncementDetail(loginId, announceId);
        return new ResponseEntity<>(new ResponseDto<>("200", announcementDto), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> postAnnouncement(@RequestBody AnnouncementDto announcementDto,
                                              @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        if(!customMemberDetails.getLoginId().equals(announcementDto.getLoginId())) throw new IncorrectAccessException();
        announcementService.postAnnouncement(announcementDto);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }

    @DeleteMapping("/{announceId}")
    public ResponseEntity<?> deleteAnnouncement(@PathVariable("announceId") Long announceId,
                                   @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        String loginId = customMemberDetails.getLoginId();
        announcementService.deleteAnnouncement(loginId, announceId);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }
    @PutMapping("/{announceId}")
    public ResponseEntity<?> updateAnnouncement(@PathVariable("announceId") Long announceId,
                                                @RequestBody AnnouncementDto announcementDto,
                                                @AuthenticationPrincipal CustomMemberDetails customMemberDetails){
        if(!customMemberDetails.getLoginId().equals(announcementDto.getLoginId())) throw new IncorrectAccessException();
        if(!announceId.equals(announcementDto.getAnnounceId())) throw new IncorrectAccessException();
        announcementService.updateAnnouncement(announcementDto);
        return new ResponseEntity<>(new ResponseDto<>("200", null), HttpStatus.OK);
    }
}
