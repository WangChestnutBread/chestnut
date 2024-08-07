package com.chestnut.backend.announcement.service;

import com.chestnut.backend.announcement.dto.AnnouncementCategoryDto;
import com.chestnut.backend.announcement.dto.AnnouncementDto;
import com.chestnut.backend.announcement.dto.AnnouncementListDto;
import com.chestnut.backend.announcement.entity.Announcement;
import com.chestnut.backend.announcement.entity.AnnouncementCategory;
import com.chestnut.backend.announcement.repository.AnnouncementCategoryRepository;
import com.chestnut.backend.announcement.repository.AnnouncementRepository;
import com.chestnut.backend.common.exception.*;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import jakarta.persistence.PersistenceException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final MemberRepository memberRepository;
    private final AnnouncementRepository announcementRepository;
    private final AnnouncementCategoryRepository announcementCategoryRepository;

    @Transactional(readOnly = true)
    public AnnouncementListDto getAnnouncementList(String loginId, Integer page, Integer size) {
        Member member = memberRepository.findByLoginId(loginId).orElseThrow(MemberNotFoundException::new);
        if(member.isWithdraw()) throw new InvalidMemberException();
        try {
            List<AnnouncementCategoryDto> announceCategory = announcementCategoryRepository.findAllDto();
            Pageable pageable = PageRequest.of(page, size, Sort.by("announceId").ascending());
            Page<AnnouncementDto> announcementListPage = announcementRepository.findAllDto(pageable);
            return new AnnouncementListDto(announceCategory, announcementListPage);
        }catch (PersistenceException e){
            throw new DatabaseException();
        }catch (Exception e){
            throw new UnknownException();
        }
    }

    @Transactional
    public AnnouncementDto getAnnouncementDetail(String loginId, Long announceId){
        Member member = memberRepository.findByLoginId(loginId).orElseThrow(MemberNotFoundException::new);
        if(member.isWithdraw()) throw new InvalidMemberException();
        try {
            if(announcementRepository.incrementHit(announceId) < 1) throw new ArticleNotFoundException();
            Announcement announcement = announcementRepository.findByAnnounceId(announceId).orElseThrow(ArticleNotFoundException::new);
            return AnnouncementDto.toDto(announcement);
        }catch (PersistenceException e){
            throw new DatabaseException();
        }catch (ArticleNotFoundException e){
            throw new ArticleNotFoundException();
        }catch (Exception e){
            throw new UnknownException();
        }
    }

    @Transactional
    public void postAnnouncement(AnnouncementDto announcementDto){
        Member member = memberRepository.findByLoginId(announcementDto.getLoginId()).orElseThrow(MemberNotFoundException::new);
        if(!member.isAdmin()) throw new AdminPermissionDeniedException();
        if(member.isWithdraw()) throw new InvalidMemberException();
        if(announcementDto.getTitle().length() > 100) throw new InvalidFormatException();
        AnnouncementCategory announcementCategory = announcementCategoryRepository.findById(announcementDto.getAnnounceCategoryId()).orElseThrow(NotFoundException::new);
        try {
            // Announcement 엔티티 생성
            Announcement announcement = Announcement.builder()
                    .title(announcementDto.getTitle())
                    .content(announcementDto.getContent())
                    .member(member)
                    .announcementCategory(announcementCategory)
                    .build();
            announcementRepository.save(announcement);
        }catch (PersistenceException e){
            throw new DatabaseException();
        }catch (Exception e){
            throw new UnknownException();
        }
    }

    @Transactional
    public void deleteAnnouncement(String loginId, Long announceId){
        Member member = memberRepository.findByLoginId(loginId).orElseThrow(MemberNotFoundException::new);
        if(!member.isAdmin()) throw new AdminPermissionDeniedException();
        if(member.isWithdraw()) throw new InvalidMemberException();
        try {
            Announcement announcement = announcementRepository.findByAnnounceId(announceId).orElseThrow(ArticleNotFoundException::new);
            announcementRepository.delete(announcement);
        }catch (PersistenceException e){
            throw new DatabaseException();
        }catch (ArticleNotFoundException e){
            throw new ArticleNotFoundException();
        }catch (Exception e){
            throw new UnknownException();
        }
    }

    @Transactional
    public void updateAnnouncement(AnnouncementDto announcementDto){
        Member member = memberRepository.findByLoginId(announcementDto.getLoginId()).orElseThrow(MemberNotFoundException::new);
        if(!member.isAdmin()) throw new AdminPermissionDeniedException();
        if(member.isWithdraw()) throw new InvalidMemberException();
        if(announcementDto.getTitle().length() > 100) throw new InvalidFormatException();
        announcementCategoryRepository.findById(announcementDto.getAnnounceCategoryId()).orElseThrow(NotFoundException::new);
        try {
            if(announcementRepository.updateAnnouncement(
                    announcementDto.getAnnounceCategoryId(),
                    announcementDto.getTitle(),
                    announcementDto.getContent(),
                    announcementDto.getAnnounceId()) < 1)
                throw new ArticleNotFoundException();
        }catch (PersistenceException e){
            throw new DatabaseException();
        }catch (ArticleNotFoundException e){
            throw new ArticleNotFoundException();
        }catch (Exception e){
            throw new UnknownException();
        }
    }
}
