package com.chestnut.backend.study.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class StringComparator {
    private StringComparator() {}

    @AllArgsConstructor
    @Getter
    public static class ComparisonResult {
        int isPass;
        List<Integer> answerMismatchIndices;
        List<Integer> inputMismatchIndices;
    }

    //두 문자열을 비교하고 결과를 반환
    public static ComparisonResult compareStrings(String answer, String userInput) {
        ProcessedString processedAnswer = preprocessAndMap(answer);
        ProcessedString processedInput = preprocessAndMap(userInput);
        List<Integer> mismatchIndices = findMismatchIndices(processedAnswer.processed, processedInput.processed);
        if (mismatchIndices.isEmpty()) {
            return new ComparisonResult(1, Collections.emptyList(), Collections.emptyList());
        }
        List<Integer> answerMismatchIndices = mapIndices(mismatchIndices, processedAnswer.mapping);
        List<Integer> inputMismatchIndices = mapIndices(mismatchIndices, processedInput.mapping);
        return new ComparisonResult(0, answerMismatchIndices, inputMismatchIndices);
    }

    //전처리된 문자열과 매핑 정보를 저장하는 내부 클래스
    @AllArgsConstructor
    private static class ProcessedString {
        final String processed; // 전처리된 문자열
        final List<Integer> mapping; // 원본 인덱스 매핑
    }

    // 문자열을 전처리하고 매핑 정보를 생성
    private static ProcessedString preprocessAndMap(String original) {
        StringBuilder processed = new StringBuilder();
        List<Integer> mapping = new ArrayList<>();
        boolean lastWasSpace = true;  // 시작 공백을 무시하기 위해 true 초기화
        for (int i = 0; i < original.length(); i++) {
            char c = original.charAt(i);
            if(!Character.isLetterOrDigit(c) && c != ' ') continue; // 문자, 숫자, 공백이 아닐 경우(, . 등) continue
            if(c == ' ' && lastWasSpace) continue; // 연속 공백일 경우 continue
            processed.append(c);
            mapping.add(i);
            lastWasSpace = (c == ' ');
        }
        while (!processed.isEmpty() && processed.charAt(processed.length() - 1) == ' ') { // 끝 부분 공백 제거
            processed.setLength(processed.length() - 1);
            mapping.remove(mapping.size() - 1);
        }
        return new ProcessedString(processed.toString(), mapping);
    }

    private static List<Integer> findMismatchIndices(String answer, String user) {
        int minLength = Math.min(answer.length(), user.length());
        int maxLength = Math.max(answer.length(), user.length());
        List<Integer> mismatchIndices = new ArrayList<>(maxLength);
        for (int i = 0; i < minLength; i++) { // 공통 길이까지 문자 비교
            if (answer.charAt(i) == user.charAt(i)) continue;
            mismatchIndices.add(i);
        }
        // 길이가 다른 경우 나머지 부분을 불일치로 처리
        for (int i = minLength; i < maxLength; i++) {
            mismatchIndices.add(i);
        }
        return mismatchIndices;
    }
    // 불일치 인덱스를 원본 문자열의 인덱스로 매핑
    private static List<Integer> mapIndices(List<Integer> indices, List<Integer> mapping) {
        List<Integer> mappedIndices = new ArrayList<>(indices.size());
        for (int index : indices) {
            if(index >= mapping.size()) break;
            mappedIndices.add(mapping.get(index));
        }
        return mappedIndices;
    }
}
