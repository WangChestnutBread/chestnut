package com.chestnut.backend.rewardLog;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name="Log_type")
@Getter
public class LogType {

    @Id
    @Column(columnDefinition = "tinyint", nullable = false)
    private Integer logTypeId;

    @Column(columnDefinition = "varchar(6)", nullable = false)
    private String logName;

    protected LogType() {}

}
