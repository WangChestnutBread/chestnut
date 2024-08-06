package com.chestnut.backend.common.interceptor;

import com.chestnut.backend.common.exception.MemberNotFoundException;
import com.chestnut.backend.common.jwt.JWTUtil;
import com.chestnut.backend.member.entity.Member;
import com.chestnut.backend.member.repository.MemberRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

import java.util.Optional;


@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketInterceptor implements ChannelInterceptor {

    private final JWTUtil jwtUtil;
    private final MemberRepository memberRepository;

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

        //커넥션 시도일 때 헤더에 닉네임 저장
        String nickname = getNickname(userId);
        accessor.setNativeHeader("nickname", nickname);

        return message;
    }

    private String getNickname(String loginId) {
        //레디스에서 꺼내오는 것 시도
        //있으면 그거 반환
        //없으면 memberRepository가서 꺼내오고 레디스에 저장(2시간 후 만료) 후 반환
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);
        return member.getNickname();
    }




}
