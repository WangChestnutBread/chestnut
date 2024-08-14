package com.chestnut.backend.member.service;

import com.chestnut.backend.common.exception.*;
import com.chestnut.backend.common.jwt.JWTUtil;
import com.chestnut.backend.common.service.RedisService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RefreshService {

    private final JWTUtil jwtUtil;
    private final RedisService redisService;

    @Transactional
    public void reissue(HttpServletRequest request, HttpServletResponse response) {

        String refresh = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh")) {
                    refresh = cookie.getValue();
                }
            }
        }

        if (refresh == null) {
            throw new RefreshTokenException();
        }

        if (jwtUtil.isExpired(refresh)) {
            throw new RefreshTokenException();
        }

        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            throw new RefreshTokenException();
        }

        String loginId = jwtUtil.getLoginId(refresh);
        String role = jwtUtil.getRole(refresh);

        boolean isExist = redisService.existData(createPrefixKey(loginId));
        if (!isExist) {
            throw new RefreshTokenException();
        }

        String newAccess = jwtUtil.createJwt("access", loginId, role, 86400000L);
        String newRefresh = jwtUtil.createJwt("refresh", loginId, role, 86400000L);

        redisService.deleteData(createPrefixKey(loginId));
        saveRefresh(loginId, newRefresh, 86400000L);

        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));
    }

    public void saveRefresh(String loginId, String refresh, Long expired) {
        redisService.setDataExpire(createPrefixKey(loginId), refresh, expired);
    }

    private String createPrefixKey(String loginId) {
        return "Refresh:" + loginId;
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setSecure(true);
        return cookie;
    }

}
