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

    @PostMapping("/{projectId}")
    public ResponseEntity<?> addToBackLog(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                          @PathVariable String projectId, Principal principal) {
        validationUtil.handleValidationErrors(result);
        ProjectTask newProjectTask = projectTaskService.saveProjectTask(projectId, projectTask, principal.getName());
        return new ResponseEntity<ProjectTask>(newProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String projectId, Principal principal) {
        return projectTaskService.findBacklogById(projectId, principal.getName());
    }

    @GetMapping("/{projectId}/{projectTaskId}")
    public ResponseEntity<?> getProjectTask(@PathVariable String projectId, @PathVariable String projectTaskId, Principal principal) {
        ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(projectId, projectTaskId, principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{projectId}/{projectTaskId}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable String projectId, @PathVariable String projectTaskId, Principal principal) {
        validationUtil.handleValidationErrors(result);
        ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, projectId, projectTaskId, principal.getName());
        return new ResponseEntity<ProjectTask>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}/{projectTaskId}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String projectId, @PathVariable String projectTaskId, Principal principal) {
        projectTaskService.deleteProjectTaskByProjectSequence(projectId, projectTaskId, principal.getName());
        return new ResponseEntity<String>("Project Task: " + projectTaskId + " deleted successfully", HttpStatus.OK);
    }
}
