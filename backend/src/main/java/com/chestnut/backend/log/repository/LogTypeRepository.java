package com.chestnut.backend.log.repository;

import com.chestnut.backend.log.entity.LogType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogTypeRepository extends JpaRepository<LogType, Byte> {

    LogType findByLogTypeId(Byte logTypeId);
}
