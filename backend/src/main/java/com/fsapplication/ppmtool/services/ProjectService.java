package com.fsapplication.ppmtool.services;

import com.fsapplication.ppmtool.entity.Backlog;
import com.fsapplication.ppmtool.entity.Project;
import com.fsapplication.ppmtool.entity.User;
import com.fsapplication.ppmtool.exceptions.ProjectIdException;
import com.fsapplication.ppmtool.exceptions.ProjectNotFoundException;
import com.fsapplication.ppmtool.repositories.BacklogRepository;
import com.fsapplication.ppmtool.repositories.ProjectRepository;
import com.fsapplication.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username) {
        String projectId = project.getProjectIdentifier().toUpperCase();
        try {
            // Project belongs to User that creates Project
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            project.setProjectIdentifier(projectId);

            if (project.getId() == null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectId);
            }

            if (project.getId() != null){
                project.setBacklog(backlogRepository.findByProjectIdentifier(projectId));
            }

            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID: " + projectId + " already exists");
        }
    }

    public Project findProjectByIdentifier(String projectId, String username) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID: " + projectId + " doesn't exist");
        }

        //Only want to return the project if the user looking for it is the owner
        if (!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project: " + projectId + " doesn't exist in your projects");
        }

        return project;
    }

    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectId, String username) {
        projectRepository.delete(findProjectByIdentifier(projectId, username));
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
