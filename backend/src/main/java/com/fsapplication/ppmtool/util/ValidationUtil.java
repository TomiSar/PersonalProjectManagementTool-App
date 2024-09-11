package com.fsapplication.ppmtool.util;

import com.fsapplication.ppmtool.exceptions.ValidationException;
import com.fsapplication.ppmtool.services.MapValidationErrorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
public class ValidationUtil {

    private final MapValidationErrorService mapValidationErrorService;

    public void handleValidationErrors(BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
            throw new ValidationException(errorMap);
        }
    }
}
