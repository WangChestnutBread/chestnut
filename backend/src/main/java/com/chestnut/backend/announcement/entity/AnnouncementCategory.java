package com.chestnut.backend.announcement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name="Announcement_category")
@Getter
public class AnnouncementCategory {

    @Id
    @Column(columnDefinition = "tinyint", nullable = false)
    private Byte announceCategoryId;

    @Column(columnDefinition = "varchar(5)", nullable = false)
    private String announceCategoryName;

    protected AnnouncementCategory() {}
}
