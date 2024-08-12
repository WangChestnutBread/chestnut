package com.chestnut.backend.common.validation.validator;

import com.chestnut.backend.common.validation.annotation.Title;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TitleValidator implements ConstraintValidator<Title, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty() || value.length() > 100) {
            return false;
        }

        return true;
    }
}