package com.chestnut.backend.announcement;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Announcement_category")
public class AnnouncementCategory {

    @Id
    @Column(columnDefinition = "tinyint", nullable = false)
    private Integer announceCategoryId;

    @Column(columnDefinition = "varchar(5)", nullable = false)
    private String announceCategoryName;

    protected AnnouncementCategory() {}
}
