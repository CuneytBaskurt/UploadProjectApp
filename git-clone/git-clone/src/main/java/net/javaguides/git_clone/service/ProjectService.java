package net.javaguides.git_clone.service;

import net.javaguides.git_clone.dto.ProjectDto;

import java.util.List;

public interface ProjectService {

    ProjectDto createProject(ProjectDto projectDto);

    ProjectDto getProjectById(Long userId);

    List<ProjectDto> getAllProjectsByProjectOwnerId(Long project_owner_ıd);

}
