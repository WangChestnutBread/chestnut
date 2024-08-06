package com.chestnut.backend.common.interceptor;

import com.chestnut.backend.common.exception.MemberNotFoundException;
import com.chestnut.backend.common.jwt.JWTUtil;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;


@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketInterceptor implements ChannelInterceptor {

    private final JWTUtil jwtUtil;
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor == null) {
            log.error("StompHeaderAccessor is null");
            return null;
        }

        // 소켓 연결 요청일 때
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            log.info("CONNECT 요청");
            return authenticate(message, accessor, true); //CONNECT할 때와 SEND할 때 로직 구분하기
        } else if (StompCommand.SEND.equals(accessor.getCommand())) {
            log.info("SEND 요청");
            return authenticate(message, accessor, false);
        }

        return message;
    }

    private Message<?> authenticate(Message<?> message, StompHeaderAccessor accessor, boolean isConnect) {
        String token = accessor.getFirstNativeHeader("access");

        if (token == null) {
            log.warn("access token이 없음");
            return null;
        }

        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            log.warn("토큰 만료");
            return null;
        }

        if (!jwtUtil.getCategory(token).equals("access")) {
            log.warn("토큰 타입 불일치");
            return null;
        }

        //인증 성공시 사용자 정보 저장
        String userId = jwtUtil.getLoginId(token);
        accessor.setUser(() -> userId);

        //헤더에 닉네임 저장
        String nickname = getNickname(userId);
        accessor.setNativeHeader("nickname", nickname);

        return message;
    }

    private String getNickname(String loginId) {
        String key = "nickname"+loginId;
        log.info("레디스 진입 전");
        String nickname = redisTemplate.opsForValue().get(key);
        log.info("nickname: " + nickname);

        if (nickname == null) {
            Member member = memberRepository.findByLoginId(loginId)
                    .orElseThrow(MemberNotFoundException::new);
            nickname = member.getNickname();
            log.info("db에서 조회한 nickname: " + nickname);
            log.info("레디스에 저장");
            redisTemplate.opsForValue().set(key, nickname, 1, TimeUnit.HOURS);

            return member.getNickname();
        } else {
            return nickname;
        }

    }




}
