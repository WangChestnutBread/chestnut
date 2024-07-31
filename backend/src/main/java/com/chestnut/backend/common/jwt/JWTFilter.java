package com.chestnut.backend.common.jwt;

import com.chestnut.backend.common.dto.ResponseDto;
import com.chestnut.backend.member.dto.CustomMemberDetails;
import com.chestnut.backend.member.dto.SessionDTO;
import com.chestnut.backend.member.entity.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String accessToken = request.getHeader("access");

        if(accessToken == null){
            //sendErrorMessage(response, "803");
            //http는 응답을 하는 순간 끝나는데 여기서 응답을 해버리니까 끝남!
            filterChain.doFilter(request, response);
            return;
        }

        try{
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            sendErrorMessage(response, "803");
            return;
        }

        String category = jwtUtil.getCategory(accessToken);
        if(!category.equals("access")){
            sendErrorMessage(response, "804");
            return;
        }

        //검증 끝 -> 일시적인 세션 만들기

        String loginId = jwtUtil.getLoginId(accessToken);
        String role = jwtUtil.getRole(accessToken);

        SessionDTO sessionDTO = new SessionDTO(loginId, role);
        Member member = sessionDTO.toEntity();
        CustomMemberDetails customMemberDetails = new CustomMemberDetails(member);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customMemberDetails, null, customMemberDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }

    private void sendErrorMessage(HttpServletResponse response, String Ecode) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpStatus.OK.value());

        ResponseDto<?> apiResponse = new ResponseDto<>(Ecode, null);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(apiResponse);
        response.getWriter().write(jsonResponse);
    }
}
