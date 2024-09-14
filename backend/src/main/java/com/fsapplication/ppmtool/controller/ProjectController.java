package com.fsapplication.ppmtool.controller;

import com.fsapplication.ppmtool.entity.Project;
import com.fsapplication.ppmtool.services.ProjectService;
import com.fsapplication.ppmtool.util.ValidationUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final ValidationUtil validationUtil;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result,
                                              Principal principal) {
        validationUtil.handleValidationErrors(result);
        Project newProject = projectService.saveProject(project, principal.getName());
        return new ResponseEntity<Project>(newProject, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId, Principal principal) {
        Project project = projectService.findProjectByIdentifier(projectId, principal.getName());
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects(Principal principal) {
        return projectService.findAllProjects(principal.getName());
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<?> updateProject(@Valid @PathVariable String projectId, @RequestBody Project project,
                                           BindingResult result, Principal principal) {
        validationUtil.handleValidationErrors(result);
        project.setProjectIdentifier(projectId);
        Project updatedProject = projectService.updateProject(project, principal.getName());
        return new ResponseEntity<Project>(updatedProject, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProjectById(@PathVariable String projectId, Principal principal) {
        projectService.deleteProjectByIdentifier(projectId, principal.getName());
        return new ResponseEntity<String>("Project with ID: " + projectId +  " deleted!", HttpStatus.OK);
    }
}