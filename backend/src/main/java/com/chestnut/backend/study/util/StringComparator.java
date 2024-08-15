package com.chestnut.backend.study.util;

import com.chestnut.backend.study.dto.PronunceEvaluateDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 두 문자열을 비교하고 평가 결과를 제공하는 유틸리티 클래스.
 * 사용자 입력과 정답 문자열을 비교하여
 * 불일치 인덱스를 찾고, 평가 결과를 담은 DTO를 생성합니다.
 */
@Slf4j
public final class StringComparator {

    // 생성자를 private으로 설정하여 인스턴스 생성을 방지
    private StringComparator() {}

    /**
     * 두 문자열을 비교하고 결과를 반환.
     *
     * @param answer 정답 문자열
     * @param userInput 사용자 입력 문자열
     * @return PronunceEvaluateDto 문자열 비교 평가 결과
     */
    public static PronunceEvaluateDto compareStrings(String answer, String userInput) {
        // 정답 문자열 전처리
        ProcessedString processedAnswer = preprocessAndMap(answer);
        // 사용자 입력 전처리
        ProcessedString processedInput = preprocessAndMap(userInput);
        log.debug("STT 태그 : 정답 전처리 결과 = {}", processedAnswer.processed);
        log.debug("STT 태그 : 사용자 발음 전처리 결과 = {}", processedInput.processed);
        log.debug("STT 태그 : 두 전처리 일치 여부 = {}", processedAnswer.processed.equals(processedInput.processed));
        // 통과 시 결과 반환
        if (processedAnswer.processed.equals(processedInput.processed)) {
            return new PronunceEvaluateDto (1, processedInput.processed, Collections.emptyList(), Collections.emptyList());
        }
        // 불일치 인덱스 찾기
        List<Integer> mismatchIndices = findMismatchIndices(processedAnswer.processed, processedInput.processed);

        // 정답 불일치 인덱스 매핑
        List<Integer> answerMismatchIndices = mapIndices(mismatchIndices, processedAnswer.mapping);
        // 사용자 입력 불일치 인덱스 매핑
        List<Integer> inputMismatchIndices = mapIndices(mismatchIndices, processedInput.mapping);
        // 불일치 시 결과 반환
        return new PronunceEvaluateDto (0, processedInput.processed, answerMismatchIndices, inputMismatchIndices);
    }

    /**
     * 전처리된 문자열과 매핑 정보를 저장하는 내부 클래스.
     */
    @AllArgsConstructor
    private static class ProcessedString {
        // 전처리된 문자열
        final String processed;
        // 원본 인덱스 매핑
        final List<Integer> mapping;
    }

    /**
     * 문자열을 전처리하고 매핑 정보를 생성.
     *
     * @param original 원본 문자열
     * @return ProcessedString 전처리된 문자열과 매핑 정보
     */
    private static ProcessedString preprocessAndMap(String original) {
        // 전처리된 문자열을 저장할 StringBuilder
        StringBuilder processed = new StringBuilder();
        // 원본 인덱스를 저장할 리스트
        List<Integer> mapping = new ArrayList<>();
        // 시작 공백을 무시하기 위해 true 초기화
        boolean lastWasSpace = true;

        // 전처리 & 원본 인덱스 저장
        for (int i = 0; i < original.length(); i++) {
            char c = original.charAt(i);
            if(!Character.isLetterOrDigit(c) && c != ' ') // 문자, 숫자, 공백이 아닐 경우(, . 등) continue
                continue;
            if(c == ' ' && lastWasSpace) // 연속 공백일 경우 continue
                continue;
            processed.append(c); // 전처리된 문자열에 추가
            mapping.add(i); // 인덱스 매핑 추가
            lastWasSpace = (c == ' '); // 마지막 문자가 공백인지 확인
        }
        // 끝 부분 공백 제거
        while (!processed.isEmpty() && processed.charAt(processed.length() - 1) == ' ') {
            processed.setLength(processed.length() - 1);
            mapping.remove(mapping.size() - 1);
        }

        return new ProcessedString(processed.toString(), mapping);
    }

    /**
     * 두 문자열의 불일치 인덱스를 찾는 메서드.
     *
     * @param answer 정답 문자열
     * @param user 사용자 입력 문자열
     * @return List<Integer> 불일치 인덱스 목록
     */
    private static List<Integer> findMismatchIndices(String answer, String user) {
        int minLength = Math.min(answer.length(), user.length());
        int maxLength = Math.max(answer.length(), user.length());
        List<Integer> mismatchIndices = new ArrayList<>(maxLength);

        // 공통 길이까지 문자 비교
        for (int i = 0; i < minLength; i++) {
            if (answer.charAt(i) == user.charAt(i)) // 일치할 경우 넘어감
                continue;
            mismatchIndices.add(i); // 불일치 인덱스 추가
        }
        // 길이가 다른 경우 나머지 부분을 불일치로 처리
        for (int i = minLength; i < maxLength; i++) {
            mismatchIndices.add(i);
        }
        // 불일치 인덱스 목록 반환
        return mismatchIndices;
    }

    /**
     * 불일치 인덱스를 원본 문자열의 인덱스로 매핑.
     *
     * @param indices 불일치 인덱스 목록
     * @param mapping 원본 인덱스 매핑 리스트
     * @return List<Integer> 매핑된 인덱스 목록
     */
    private static List<Integer> mapIndices(List<Integer> indices, List<Integer> mapping) {
        // 매핑된 인덱스 리스트
        List<Integer> mappedIndices = new ArrayList<>(indices.size());
        for (int index : indices) {
            // 유효한 인덱스인지 확인
            if(index >= mapping.size()) break;
            mappedIndices.add(mapping.get(index));
        }
        return mappedIndices;
    }
}
