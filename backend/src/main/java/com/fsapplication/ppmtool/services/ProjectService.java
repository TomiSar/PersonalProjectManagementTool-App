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

    public Project saveProject(Project project, String username) {
        String projectId = project.getProjectIdentifier().toUpperCase();

        // Set User details to Project
        User user = userRepository.findByUsername(username);
        project.setUser(user);
        project.setProjectLeader(user.getUsername());
        project.setProjectIdentifier(projectId);

        // New project create Backlog
        if (project.getId() == null) {
            Backlog backlog = new Backlog();
            project.setBacklog(backlog);
            backlog.setProject(project);
            backlog.setProjectIdentifier(projectId);
        }
        return projectRepository.save(project);
    }

    public Project updateProject(Project project, String username) {
        String projectId = project.getProjectIdentifier().toUpperCase();
        Project updatedProject = projectRepository.findByProjectIdentifier(projectId);

        if (updatedProject == null) {
            throw new ProjectNotFoundException("Project ID: " + projectId + " doesn't exist and can't be updated");
        }

        // User should be the project leader
        if (!updatedProject.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("You don't have access to update Project ID: " + project.getProjectIdentifier());
        }

        // Update fields provided fields
        if (project.getProjectName() != null) {
            updatedProject.setProjectName(project.getProjectName());
        }
        if (project.getDescription() != null) {
            updatedProject.setDescription(project.getDescription());
        }
        if (project.getStart_date() != null) {
            updatedProject.setStart_date(project.getStart_date());
        }
        if (project.getEnd_date() != null) {
            updatedProject.setEnd_date(project.getEnd_date());
        }
        return projectRepository.save(updatedProject);
    }

    public Project findProjectByIdentifier(String projectId, String username) {
        // Only want to return the project if the user looking for it is the owner
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID: " + projectId + " doesn't exist");
        }

        //Only want to return the project if the user looking for it is the owner
        if (!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("You don't have access to Project ID: " + projectId);
        }

        return project;
    }

    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectId, String username) {
        projectRepository.delete(findProjectByIdentifier(projectId, username));
    }
}
