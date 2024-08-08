package com.chestnut.backend.member.controller;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.member.dto.RankDto;
import com.chestnut.backend.member.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/ranking-list")
    public ResponseEntity<?> getTopTenMembers() {
        List<RankDto> topTenMembers = rankingService.getEntireRankingList("RANKINGLIST");
        ResponseDto<List<RankDto>> result = new ResponseDto<>("200", topTenMembers);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
