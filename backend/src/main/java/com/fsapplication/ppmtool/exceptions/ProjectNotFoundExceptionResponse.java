package com.fsapplication.ppmtool.exceptions;

import lombok.Data;

@Data
public class ProjectNotFoundExceptionResponse {

    private String ProjectNotFound;

    public ProjectNotFoundExceptionResponse(String projectNotFound) {
        ProjectNotFound = projectNotFound;
    }
}
