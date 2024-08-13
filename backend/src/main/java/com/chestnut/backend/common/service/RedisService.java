package com.chestnut.backend.common.service;

import com.chestnut.backend.common.config.RedisConfig;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RedisService {
    private final RedisConfig redisConfig;
    private final StringRedisTemplate template;

    public String getData(String key) {
        ValueOperations<String, String> ops = template.opsForValue();
        return ops.get(key);
    }

    public boolean existData(String key) {
        return Boolean.TRUE.equals(template.hasKey(key));
    }

    public void setDataExpire(String key, String value, long duration) {
        ValueOperations<String, String> ops = template.opsForValue();
        Duration expireDuration = Duration.ofMillis(duration);
        ops.set(key, value, expireDuration);
    }

    public <T> void setListDataExpire(String key, List<T> list, long duration) {
        ValueOperations<String, String> ops = template.opsForValue();
        try {
            String value = redisConfig.objectMapper().writeValueAsString(list);
            ops.set(key, value, Duration.ofMillis(duration));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public <T> List<T> getListData(String key) {
        String value = template.opsForValue().get(key);
        if (value == null)  return null;
        try {
            return redisConfig.objectMapper().readValue(value, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteData(String key) {
        template.delete(key);
    }
}
