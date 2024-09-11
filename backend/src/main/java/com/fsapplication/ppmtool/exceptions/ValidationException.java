package com.fsapplication.ppmtool.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
@AllArgsConstructor
public class ValidationException extends RuntimeException {

    private final ResponseEntity<?> errorResponse;
}