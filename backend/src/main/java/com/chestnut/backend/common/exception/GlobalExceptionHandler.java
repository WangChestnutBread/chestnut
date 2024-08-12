package com.chestnut.backend.common.exception;

import com.chestnut.backend.common.dto.ResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import java.io.IOException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException e) {
        return new ResponseEntity<>(new ResponseDto<>(e.getMessage(), null), HttpStatus.OK);
    }

    /**
     * 유효성 검사 오류 (Request Body에서의 유효성 검사)
     * @param e
     * @return
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException e) {
        return new ResponseEntity<>(new ResponseDto<>("603", null), HttpStatus.OK);
    }

    /**
     * 유효성 검사 오류 (Request Header에서의 유효성 검사)
     * @param e
     * @return
     */
    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<?> handleValidationException(HandlerMethodValidationException e) {
        return new ResponseEntity<>(new ResponseDto<>("603", null), HttpStatus.OK);
    }

    /**
     * 무결성 제약 위반시 발생
     * @param e
     * @return
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> integrityViolationException(DataIntegrityViolationException e) {
        return new ResponseEntity<>(new ResponseDto<>("601", null), HttpStatus.OK);
    }

    /**
     * 데이터 베이스 전반 오류
     * @param e
     * @return
     */
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<?> dataException(DataAccessException e) {
        return new ResponseEntity<>(new ResponseDto<>("704", null), HttpStatus.OK);
    }

    /**
     * db에 정보가 없을 때
     * @param e
     * @return
     */
    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<?> noDataException(EmptyResultDataAccessException e) {
        return new ResponseEntity<>(new ResponseDto<>("710", null), HttpStatus.OK);
    }

    /**
     * Redis 관련 에러 처리
     * @param e
     * @return
     */
    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<?> RedisException(JsonProcessingException e) {
        return new ResponseEntity<>(new ResponseDto<>("705", null), HttpStatus.OK);
    }

    /**
     * 녹음 파일 관련 파일 처리 중 발생
     * @param e
     * @return
     */
    @ExceptionHandler(IOException.class)
    public ResponseEntity<?> FileIOException(IOException e) {
        return new ResponseEntity<>(new ResponseDto<>("902", null), HttpStatus.OK);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUnknownException(Exception e) {
        System.out.println("2");
        return new ResponseEntity<>(new ResponseDto<>("299", null), HttpStatus.OK);
    }

}