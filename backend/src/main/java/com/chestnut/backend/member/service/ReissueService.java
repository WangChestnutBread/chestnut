package com.chestnut.backend.member.service;

import com.chestnut.backend.common.exception.InvalidRefreshTokenException;
import com.chestnut.backend.common.exception.RefreshTokenCategoryException;
import com.chestnut.backend.common.exception.RefreshTokenExpiredException;
import com.chestnut.backend.common.exception.RefreshTokenNullException;
import com.chestnut.backend.common.jwt.JWTUtil;
import com.chestnut.backend.member.entity.RefreshEntity;
import com.chestnut.backend.member.repository.RefreshRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class ReissueService {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    @Transactional
    public void reissue(HttpServletRequest request, HttpServletResponse response) {

        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies) {
            if(cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }

        if(refresh == null){
            throw new RefreshTokenNullException("805");
        }

        if(jwtUtil.isExpired(refresh)){
            throw new RefreshTokenExpiredException("806");
        }

        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            throw new RefreshTokenCategoryException("807");
        }

        //db에 해당 refresh 토큰이 저장되어 있는지 확인
        Boolean isExist = refreshRepository.existsByRefresh(refresh);
        if(!isExist){
            throw new InvalidRefreshTokenException("808");
        }

        //저장되어 있는 경우라면 -> 기존 refresh 삭제 및 새로운 refresh 저장

        String loginId = jwtUtil.getLoginId(refresh);
        String role = jwtUtil.getRole(refresh);

        String newAccess = jwtUtil.createJwt("access", loginId, role, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", loginId, role, 86400000L);

        refreshRepository.deleteByRefresh(refresh);
        addRefreshEntity(loginId, newRefresh, 86400000L);

        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));
    }

    private void addRefreshEntity(String loginId, String refresh, Long expiredMs) {

        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setLoginId(loginId);
        refreshEntity.setRefresh(refresh);
        refreshEntity.setExpiration(date.toString());

        refreshRepository.save(refreshEntity);
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setHttpOnly(true);

        return cookie;
    }

}
