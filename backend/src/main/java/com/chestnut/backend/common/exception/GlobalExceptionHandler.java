package com.chestnut.backend.common.exception;

import com.chestnut.backend.common.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException e) {
        return new ResponseEntity<>(new ResponseDto<>(e.getMessage(), null), HttpStatus.OK);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUnknownException(Exception e) {
        return new ResponseEntity<>(new ResponseDto<>("299", null), HttpStatus.OK);
    }

}