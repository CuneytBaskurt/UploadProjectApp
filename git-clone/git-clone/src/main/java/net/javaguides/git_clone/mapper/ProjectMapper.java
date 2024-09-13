package net.javaguides.git_clone.mapper;

import net.javaguides.git_clone.dto.ProjectDto;
import net.javaguides.git_clone.entity.Project;

public class ProjectMapper {

    public static ProjectDto mapToProjectDto(Project project) {
        return new ProjectDto(
                project.getId(),
                project.getTitle(),
                project.getLanguage(),
                project.getExplanation(),
                project.getProjectOwnerId()
        );
    }

    public static Project mapToProject(ProjectDto projectDto) {
        Project project = new Project();
        project.setId(projectDto.getId());
        project.setTitle(projectDto.getTitle());
        project.setLanguage(projectDto.getLanguage());
        project.setExplanation(projectDto.getExplanation());
        project.setProjectOwnerId(projectDto.getProjectOwnerId());

        return project;
    }
}
