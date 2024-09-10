package com.fsapplication.ppmtool.services;

import com.fsapplication.ppmtool.entity.Backlog;
import com.fsapplication.ppmtool.entity.ProjectTask;
import com.fsapplication.ppmtool.exceptions.ProjectNotFoundException;
import com.fsapplication.ppmtool.repositories.BacklogRepository;
import com.fsapplication.ppmtool.repositories.ProjectRepository;
import com.fsapplication.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    public ProjectTask saveProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {

        // ProjectTasks to be added to a specific project, project != null, Backlog exists
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
        // Set the Backlog to ProjectTask
        projectTask.setBacklog(backlog);

        // Project sequence: IDPRO-1, IDPRO-2, IDPRO-3, ... Add updated Backlog (backlogSequence) to ProjectTask (projectSequence)
        Integer backlogSequence = backlog.getPTSequence();
        backlogSequence++;
        backlog.setPTSequence(backlogSequence);
        backlogRepository.save(backlog);

        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        // INITIAL priority when priority null and INITIAL status when status is null
        if (projectTask.getStatus() == null || projectTask.getStatus().isBlank()) {
            projectTask.setStatus("TO_DO");
        }
        // Future we need projectTask.getPriority() == 0 to handle the form
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }

        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findBacklogById(String projectId, String username) {
        projectService.findProjectByIdentifier(projectId, username);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectId);
    }

    public ProjectTask findProjectTaskByProjectSequence(String backlogId, String projectTaskId, String username) {
        // Backlog exists
        projectService.findProjectByIdentifier(backlogId, username);

        // Task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectTaskId);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task ID: " + projectTaskId + " not found");
        }

        // Backlog/projectId in the path corresponds to the right project
        if (!projectTask.getProjectIdentifier().equals(backlogId)) {
            throw new ProjectNotFoundException("Project Task ID: " + projectTaskId + " doesn't exist on project: " + backlogId);
        }

        return projectTaskRepository.findByProjectSequence(projectTaskId);
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlogId, String projectTaskId, String username) {
        ProjectTask projectTask = findProjectTaskByProjectSequence(backlogId, projectTaskId, username);
        projectTask = updatedTask;
        return projectTaskRepository.save(projectTask);
    }

    public void deleteProjectTaskByProjectSequence(String backlogId, String projectTaskId, String username) {
        ProjectTask projectTask = findProjectTaskByProjectSequence(backlogId, projectTaskId, username);
        projectTaskRepository.delete(projectTask);
    }
}