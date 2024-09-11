package com.fsapplication.ppmtool.controller;

import com.fsapplication.ppmtool.entity.ProjectTask;
import com.fsapplication.ppmtool.services.ProjectTaskService;
import com.fsapplication.ppmtool.util.ValidationUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
@RequiredArgsConstructor
public class BacklogController {

    private final ProjectTaskService projectTaskService;
    private final ValidationUtil validationUtil;

    @PostMapping("/{backlogId}")
    public ResponseEntity<?> addToBackLog(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                          @PathVariable String backlogId, Principal principal) {
        validationUtil.handleValidationErrors(result);
        ProjectTask newProjectTask = projectTaskService.saveProjectTask(backlogId, projectTask, principal.getName());
        return new ResponseEntity<ProjectTask>(newProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogId}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlogId, Principal principal) {
        return projectTaskService.findBacklogById(backlogId, principal.getName());
    }

    @GetMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlogId, @PathVariable String projectTaskId, Principal principal) {
        ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(backlogId, projectTaskId, principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable String backlogId, @PathVariable String projectTaskId, Principal principal) {
        validationUtil.handleValidationErrors(result);
        ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, backlogId, projectTaskId, principal.getName());
        return new ResponseEntity<ProjectTask>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlogId, @PathVariable String projectTaskId, Principal principal) {
        projectTaskService.deleteProjectTaskByProjectSequence(backlogId, projectTaskId, principal.getName());
        return new ResponseEntity<String>("Project Task: " + projectTaskId + " deleted successfully", HttpStatus.OK);
    }
}
