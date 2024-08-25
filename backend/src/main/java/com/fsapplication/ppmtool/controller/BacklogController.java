package com.fsapplication.ppmtool.controller;

import com.fsapplication.ppmtool.entity.ProjectTask;
import com.fsapplication.ppmtool.services.MapValidationErrorService;
import com.fsapplication.ppmtool.services.ProjectTaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin("*")
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlogId}")
    public ResponseEntity<?> addToBackLog(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlogId) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        ProjectTask newProjectTask = projectTaskService.saveProjectTask(backlogId, projectTask);
        return new ResponseEntity<ProjectTask>(newProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogId}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlogId) {
        return projectTaskService.findBacklogById(backlogId);
    }

    @GetMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlogId, @PathVariable String projectTaskId) {
        ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(backlogId, projectTaskId);
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }
}
