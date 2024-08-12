package com.chestnut.backend.member.validation.validator;

import com.chestnut.backend.common.exception.InvalidFormatException;
import com.chestnut.backend.member.validation.annotation.Password;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<Password, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            return false;
        }

        String regex = "^[a-zA-Z0-9!@#$%^&*()_+\\[\\]{}|;':\",./<>?~`-]{8,15}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(value);
        if (!matcher.matches()) {
            return false;
        }
        return true;
    }
}