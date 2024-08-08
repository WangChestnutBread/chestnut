package com.chestnut.backend.member.service;

import com.chestnut.backend.member.dto.RankDto;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MainMemberRepository;
import com.chestnut.backend.member.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class RankingService {

    private final MainMemberRepository mainMemberRepository;
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    private final String RANKINGKEY = "RANKINGLIST";


    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    @Transactional
    public void updateRank() {
        log.info("updateRank 시작");
        //member의 rank 필드 업데이트
        mainMemberRepository.updateRanking();

        //상위 10명 member에서 가져오기
        List<Member> topTen = memberRepository.findTop10ByOrderByRankingAsc();
        List<RankDto> topMembers = topTen.stream()
                .map(item -> new RankDto(item.getRanking(), item.getNickname(), item.getJoinAt(), item.getAvatar().getAvatarThumbnailUrl(), item.getReward()))
                .toList();
        System.out.println(topMembers);

        //상위 10명 레디스 sorted set에 저장
        saveRankingList(RANKINGKEY, topMembers);


        log.info("{}: updateRank 실행됨", LocalDateTime.now());
        log.info("랭킹 작업 완료");
    }

    public void saveRankingList(String key, List<RankDto> rankingList) {
        redisTemplate.delete(key);
        List<String> serializedList = rankingList.stream()
                .map(this::serializeRankDto)
                .collect(Collectors.toList());
        redisTemplate.opsForList().rightPushAll(key, serializedList);
    }

    public List<RankDto> getRankingListRange(String key, long start, long end) {
        List<String> objects = redisTemplate.opsForList().range(key, start, end);
        if (objects == null) {
            return new ArrayList<>();
        }
        return objects.stream()
                .map(this::deserializeRankDto)
                .collect(Collectors.toList());
    }

    public List<RankDto> getEntireRankingList(String key) {
        return getRankingListRange(key, 0, -1);
    }


    private String serializeRankDto(RankDto rankDto) {
        try {
            return objectMapper.writeValueAsString(rankDto);
        } catch (JsonProcessingException e) {
            log.error("직렬화 오류 발생");
            return "";
        }
    }

    private RankDto deserializeRankDto(String json) {
        try {
            return objectMapper.readValue(json, RankDto.class);
        } catch (JsonProcessingException e) {
            log.error("역직렬화 오류 발생", e);
            return null;
        }
    }



}
