package com.fsapplication.ppmtool.services;

import com.fsapplication.ppmtool.entity.Backlog;
import com.fsapplication.ppmtool.entity.Project;
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

    public ProjectTask saveProjectTask(String projectIdentifier, ProjectTask projectTask) {

        try {
            // ProjectTasks to be added to a specific project, project != null, Backlog exists
            // Set the Backlog to ProjectTask
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
            projectTask.setBacklog(backlog);

            // Project sequence: IDPRO-1  IDPRO-2 (Update the Backlog SEQUENCE) and Add sequence to ProjectTask
            // Increment the backlog sequence and Update and save the backlog sequence
            Integer backlogSequence = backlog.getPTSequence();
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);
            backlogRepository.save(backlog);

            projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            // INITIAL priority when priority null and INITIAL status when status is null
            if (projectTask.getStatus() == null || projectTask.getStatus().isBlank()){
                projectTask.setStatus("TO_DO");
            }
            // Future we need projectTask.getPriority() == 0 to handle the form
            if (projectTask.getPriority() == null) {
                projectTask.setPriority(3);
            }

            return projectTaskRepository.save(projectTask);
        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not Found");
        }
    }

    public Iterable<ProjectTask>findBacklogById(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        if (project == null) {
            throw new ProjectNotFoundException("Project ID: " + projectId + " doesn't exist.");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectId);
    }
}