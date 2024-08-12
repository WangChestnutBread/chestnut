package com.chestnut.backend.study.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

/**
 * 발음 평가 결과를 담는 담는 Data Transfer Object.
 * 발음 평가의 결과를 저장하며,
 * 발음 내용, 불일치 인덱스 목록 등을 포함.
 */
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PronunceEvaluateDto {
    //평가 통과 여부 (1: 통과, 0: 불통과)
    private int isPass;
    // 사용자가 발음한 내용
    private String pronunciation;
    // 정답과의 불일치 인덱스 목록
    private List<Integer> answerMismatchIndices;
    // 사용자의 발음과의 불일치 인덱스 목록
    private List<Integer> userMismatchIndices;
}