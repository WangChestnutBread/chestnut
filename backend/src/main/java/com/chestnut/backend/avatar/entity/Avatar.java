package com.chestnut.backend.avatar.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;

@Entity
@Table(name="avatar")
@Getter
public class Avatar {
    @Id
    @Column(columnDefinition = "tinyint", nullable = false)
    private Byte avatarId;

    @Column(columnDefinition = "varchar(10)", nullable = false)
    private String avatarName;

    @Column(columnDefinition = "varchar(255)", nullable = false)
    private String avatarImgUrl;

    @Column(columnDefinition = "varchar(255)", nullable = false)
    private String avatarThumbnailUrl;

    @Column(columnDefinition = "tinyint", nullable = false)
    private Byte lowerLimit;

    protected Avatar() {}
}
