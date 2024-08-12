package com.chestnut.backend.log.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

/**
 * 출석 기록을 담는 Data Transfer Object.
 * 멤버의 출석 날짜 목록을 포함.
 */
@Getter
@ToString
@AllArgsConstructor
public class AttendanceLogDto {
    // 출석한 날짜 목록
    List<LocalDate> attendanceAt;
}
