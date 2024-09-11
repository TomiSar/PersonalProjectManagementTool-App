package com.fsapplication.ppmtool.validator;

import com.fsapplication.ppmtool.entity.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    /** This Validator validates only User instances */
    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object object, Errors errors) {
        User user = (User) object;

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            errors.rejectValue("password", "NotEmpty", "Password is required");
        } else if (user.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters");
        }

        if (user.getConfirmPassword() == null || user.getConfirmPassword().isEmpty()) {
            errors.rejectValue("confirmPassword", "NotEmpty", "Confirm password is required");
        } else if (user.getConfirmPassword().length() < 6) {
            errors.rejectValue("confirmPassword", "Length", "Confirm password must be at least 6 characters");
        } else if (!user.getPassword().equals(user.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Password and Confirm password do not match");
        }
    }
}
