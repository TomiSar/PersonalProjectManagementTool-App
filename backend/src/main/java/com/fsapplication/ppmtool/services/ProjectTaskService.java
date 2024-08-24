package com.fsapplication.ppmtool.services;

import com.fsapplication.ppmtool.entity.Backlog;
import com.fsapplication.ppmtool.entity.ProjectTask;
import com.fsapplication.ppmtool.repositories.BacklogRepository;
import com.fsapplication.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask saveProjectTask(String projectIdentifier, ProjectTask projectTask) {

        //Exceptions: Project not found
        // ProjectTasks to be added to a specific project, project != null, Backlog exists
        // Set the Backlog to ProjectTask
        // Project sequence: IDPRO-1  IDPRO-2  ...100 101 (Update the Backlog SEQUENCE)
        // Add sequence to ProjectTask
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        projectTask.setBacklog(backlog);

        // Increment the backlog sequence and Update and save the backlog sequence
        Integer backlogSequence = backlog.getPTSequence();
        backlogSequence++;
        backlog.setPTSequence(backlogSequence);
        backlogRepository.save(backlog);

        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        //INITIAL priority when priority null
        // INITIAL status when status is null
        if (projectTask.getStatus() == null || projectTask.getStatus().isBlank()){
            projectTask.setStatus("TO_DO");
        }
        // Future we need projectTask.getPriority() == 0 to handle the form
        if (projectTask.getPriority() == null) {
            projectTask.setPriority(3);
        }

        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask>findBacklogById(String projectId){
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectId);
    }
}