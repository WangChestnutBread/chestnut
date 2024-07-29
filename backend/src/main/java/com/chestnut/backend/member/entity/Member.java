package com.chestnut.backend.member.entity;

import com.chestnut.backend.avatar.Avatar;
import com.chestnut.backend.study.Study;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id")
    private Long memberId;

    //@NotNull
    private String loginId;
    //@NotNull
    private String password;
    //@NotNull @Email //jakarta.validation을 현명하게 이용하는 방법은?
    private String email;
    //@NotNull
    private String nickname;
    private LocalDate birthday;
    //@NotNull
    private String memberName;
    //@NotNull
    private boolean isAdmin;
    //@NotNull //default값은 어떻게 설정하는게 좋을까?
    private long reward;
    //@NotNull
    private LocalDateTime joinAt;
    private LocalDateTime withdrawAt;
    //@NotNull
    private boolean isWithdraw;
    //@NotNull
    private int ranking;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="avatar_id")
//    private Avatar avatar;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="study_id")
//    private Study study;

    public Member(String loginId, String password, String email, String nickname, String memberName, LocalDate birthday){
        this.loginId = loginId;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
        this.memberName = memberName;
        this.birthday = birthday;
    }

}
