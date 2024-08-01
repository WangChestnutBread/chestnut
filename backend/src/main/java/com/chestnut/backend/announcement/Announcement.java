package com.chestnut.backend.announcement;

import com.chestnut.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Table(name="Announcement")
@Getter
public class Announcement {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned", nullable = false)
    private Long announceId;

    @Column(columnDefinition = "varchar(100)", nullable = false)
    private String title;

    @Column(columnDefinition = "timestamp default now()", nullable = false)
    private LocalDateTime createdAt;

    @Column(columnDefinition = "timestamp default now()", nullable = false)
    private LocalDateTime updatedAt;

    @Column(columnDefinition = "text", nullable = false)
    private String content;

    @Column(columnDefinition = "int unsigned default 0", nullable = false)
    private int hit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="announce_category_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private AnnouncementCategory announcementCategory;

    protected Announcement() {}

    @Builder
    public Announcement(
        String title,
        String content,
        int hit,
        Member member,
        AnnouncementCategory announcementCategory
    ) {
        this.title = title;
        this.content = content;
        this.hit = hit;
        this.member = member;
        this.announcementCategory = announcementCategory;
    }

    @PostPersist
    private void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.updatedAt == null) {
            this.updatedAt = LocalDateTime.now();
        }
    }

    @PostUpdate
    private void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
