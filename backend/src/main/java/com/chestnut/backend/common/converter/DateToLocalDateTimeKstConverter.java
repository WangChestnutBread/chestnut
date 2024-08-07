package com.chestnut.backend.common.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
@WritingConverter
public class DateToLocalDateTimeKstConverter implements Converter<Date, LocalDateTime> {

    @Override
    public LocalDateTime convert(Date source) {
        return source.toInstant().atZone(ZoneId.systemDefault())
                .toLocalDateTime().minusHours(9);
    }
}