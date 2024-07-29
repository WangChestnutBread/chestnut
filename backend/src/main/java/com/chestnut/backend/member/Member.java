package com.chestnut.backend.member;

import com.chestnut.backend.avatar.Avatar;
import com.chestnut.backend.study.Study;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static java.time.LocalDateTime.now;

@Entity
@Table(name="Member")
@Data @Builder
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id")
    private Long memberId;

    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    @Pattern(regexp = "^[a-zA-Z0-9]{5,15}$", message = "아이디는 영문 또는 숫자 5~15자로 구성해야 합니다")
    private String loginId;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Pattern(regexp = "^.{8,}$", message = "비밀번호는 8자 이상이어야 합니다.")
    private String password;

    @NotBlank //jakarta.validation을 현명하게 이용하는 방법은?
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식이 올바르지 않습니다.")
    private String email;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]{5,20}$", message = "닉네임은 영문, 한글 또는 숫자 5~20자로 구성해야 합니다")
    private String nickname;

    private LocalDate birthday;

    @NotBlank
    private String memberName;

    @Column(columnDefinition = "tinyint(1) default 0", nullable=false)
    private boolean isAdmin;

    @NotNull //default값은 어떻게 설정하는게 좋을까?
    @Column(columnDefinition = "int unsigned default 0")
    private long reward;

    @NotNull
    @Column(columnDefinition = "timestamp default now()")
    private LocalDateTime joinAt;

    private LocalDateTime withdrawAt;

    @NotNull
    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean isWithdraw;

    @NotNull
    @Column(columnDefinition = "int unsigned")
    private int rank;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="avatar_id")
    private Avatar avatar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="study_id")
    private Study study;

    public Member() {

    }

    @PrePersist
    protected void onCreate() {
        if (this.joinAt == null) {
            this.joinAt = now();
        }
        //나머지 boolean, long등 primitive 타입 필드들은 값이 배정되지 않았을 때 default로 false, 0의 값을 가짐
    }
}

