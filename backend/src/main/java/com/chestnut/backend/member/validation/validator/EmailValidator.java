package com.chestnut.backend.member.validation.validator;

import com.chestnut.backend.common.exception.InvalidFormatException;
import com.chestnut.backend.member.validation.annotation.Email;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidator implements ConstraintValidator<Email, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        System.out.println("3");
        if (value == null || value.trim().isEmpty()) {
            return false;
        }

        System.out.println("4");
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(value);
        if (!matcher.matches()) {
            return false;
        }
        System.out.println("5");
        return true;
    }
}
