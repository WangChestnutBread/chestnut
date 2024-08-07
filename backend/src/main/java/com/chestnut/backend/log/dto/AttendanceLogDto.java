package com.chestnut.backend.log.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@ToString
@AllArgsConstructor
public class AttendanceLogDto {
    List<LocalDate> attendanceAt;
}
