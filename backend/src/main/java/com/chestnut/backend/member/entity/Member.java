package com.chestnut.backend.member.entity;

import com.chestnut.backend.avatar.entity.Avatar;
import com.chestnut.backend.study.entity.Study;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static java.time.LocalDateTime.now;

@Entity
@Table(name="member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@DynamicInsert
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id")
    private Long memberId;

    @NotNull
    private String loginId;
    @NotNull
    private String password;
    @NotNull
    private String email;
    @NotNull
    private String nickname;
    private LocalDate birthday;
    @NotNull
    private String memberName;
    @NotNull
    private boolean isAdmin;
    @NotNull
    private long reward;
    @NotNull
    private LocalDateTime joinAt;
    private LocalDateTime withdrawAt;
    @NotNull
    private boolean isWithdraw;
    @NotNull
    private int ranking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="avatar_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Avatar avatar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="study_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT), nullable = true)
    private Study study;

    public void changePassword(String newPassword) {
        password = newPassword;
    }

    @PrePersist
    protected void onCreate() {
        if (this.joinAt == null) {
            this.joinAt = now();
        }
        //나머지 boolean, long등 primitive 타입 필드들은 값이 배정되지 않았을 때 default로 false, 0의 값을 가짐
    }

}
