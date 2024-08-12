package com.chestnut.backend.common.validation.validator;

import com.chestnut.backend.common.validation.annotation.Content;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ContentValidator implements ConstraintValidator<Content, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            return false;
        }

        return true;
    }
}