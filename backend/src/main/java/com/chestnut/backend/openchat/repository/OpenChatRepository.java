package com.chestnut.backend.openchat.repository;

import com.chestnut.backend.openchat.dto.ChatLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OpenChatRepository extends MongoRepository<ChatLog, String> {
}
