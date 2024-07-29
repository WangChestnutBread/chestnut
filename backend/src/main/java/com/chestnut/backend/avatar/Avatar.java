package com.chestnut.backend.avatar;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Avatar {
    @Id
    private Integer avatarId;
}
