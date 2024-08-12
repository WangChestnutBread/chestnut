package com.chestnut.backend.member.entity;

import com.chestnut.backend.avatar.entity.Avatar;
import com.chestnut.backend.member.dto.ChangeInfoReqDTO;
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
    @Column(unique=true)
    private String loginId;
    @NotNull
    private String password;
    @NotNull
    @Column(unique=true)
    private String email;
    @NotNull
    @Column(unique=true)
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

    public void changeInfo(ChangeInfoReqDTO changeInfoReqDTO) {
        nickname = changeInfoReqDTO.getNickname();
        email = changeInfoReqDTO.getEmail();
        memberName = changeInfoReqDTO.getMemberName();
        birthday = changeInfoReqDTO.getBirthday();
    }

    public void withdraw() {
        password = "-";
        email = "-";
        memberName = "-";
        nickname = "알수 없음";
        birthday = LocalDate.of(9999,12,31);
        withdrawAt = now();
        isWithdraw = true;
        ranking = 0;
    }

    @PrePersist
    protected void onCreate() {
        if (this.joinAt == null) {
            this.joinAt = now();
        }
    }

    public void addReward(byte reward) {
        this.reward += (long)reward;
    }

    public void recentStudy(Study study) {
        this.study = study;
    }

    public void updateAvatar(Avatar avatar) {
        this.avatar = avatar;
    }

}
