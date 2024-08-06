package com.chestnut.backend.common.config;

import com.chestnut.backend.common.jwt.CustomLogoutFilter;
import com.chestnut.backend.common.jwt.JWTFilter;
import com.chestnut.backend.common.jwt.JWTUtil;
import com.chestnut.backend.common.jwt.LoginFilter;
import com.chestnut.backend.common.service.RedisService;
import com.chestnut.backend.member.service.RefreshService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final RefreshService refreshService;
    private final RedisService redisService;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors((corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(List.of("http://localhost:3000", "https://i11d107.p.ssafy.io", "http://127.0.0.1:5500")); //front에서 정보를 보내니까
                        configuration.setAllowedMethods(Collections.singletonList("*")); //허용할 메서드
                        configuration.setAllowCredentials(true); //front에서 credential 설정을 하면 무조건 true로 바꿔줘야 한다.
                        configuration.setAllowedHeaders(Collections.singletonList("*")); //사용할 헤더
                        configuration.setMaxAge(3600L); //설정 시간

                        configuration.setExposedHeaders(Collections.singletonList("access"));

                        return configuration;
                    }
                })));

        http
                .csrf((auth) -> auth.disable());
        http
                .formLogin((auth) -> auth.disable());
        http
                .httpBasic((auth) -> auth.disable());

        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/open-chatting","/index.html","/app.js","main.css").permitAll()
                        .requestMatchers("/member/login", "/member/find-id","/member/signup").permitAll()
                        .requestMatchers("/member/check-nickname", "/member/check-loginId", "/member/check-email").permitAll()
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .requestMatchers("/member/reissue", "member/email/code-request", "/member/email/code-check", "/member/reset-pwd/unknown").permitAll()
                        .anyRequest().authenticated());

        http
                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);
        http
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshService), UsernamePasswordAuthenticationFilter.class);
        http
                .addFilterBefore(new CustomLogoutFilter(jwtUtil, redisService), LogoutFilter.class);
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
