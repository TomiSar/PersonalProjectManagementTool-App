package com.fsapplication.ppmtool.services;

import com.fsapplication.ppmtool.entity.Backlog;
import com.fsapplication.ppmtool.entity.Project;
import com.fsapplication.ppmtool.exceptions.ProjectIdException;
import com.fsapplication.ppmtool.repositories.BacklogRepository;
import com.fsapplication.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {
        String projectId = project.getProjectIdentifier().toUpperCase();
        try {
            project.setProjectIdentifier(projectId);

            if(project.getId() == null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectId);
            }

            if(project.getId() != null){
                project.setBacklog(backlogRepository.findByProjectIdentifier(projectId));
            }

            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID: " + projectId + " already exists");
        }

    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID: " + projectId + " doesn't exist");
        }

        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId);
        if (project == null) {
            throw new ProjectIdException("Failed to delete Project ID: " + projectId + " doesn't exist");
        }

        projectRepository.delete(project);
    }

    public Project updateProjectByIdentifier(String projectIdentifier, Project project) {
        String projectId = project.getProjectIdentifier().toUpperCase();
        Project existingProject = projectRepository.findByProjectIdentifier(projectId);
        if (existingProject == null) {
            throw new ProjectIdException("Failed to update Project ID: " + projectIdentifier + " doesn't exist");
        }

        // Update fields
        existingProject.setProjectName(project.getProjectName());
        existingProject.setDescription(project.getDescription());
        existingProject.setStart_date(project.getStart_date());
        existingProject.setEnd_date(project.getEnd_date());

        // Update the backlog if necessary
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectId);
        if (backlog != null) {
            backlog.setProjectIdentifier(projectId);
            backlogRepository.save(backlog);
            existingProject.setBacklog(backlog);
        }

        return projectRepository.save(existingProject);
    }
}
