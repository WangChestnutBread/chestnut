package com.chestnut.backend.common.exception;

public class InvalidRefreshTokenException extends CustomException{
    public InvalidRefreshTokenException(String message) {
        super(message);
    }
}
