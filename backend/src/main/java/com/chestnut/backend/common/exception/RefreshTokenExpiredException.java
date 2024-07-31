package com.chestnut.backend.common.exception;

public class RefreshTokenExpiredException extends CustomException{
    public RefreshTokenExpiredException(String message) {
        super(message);
    }
}
