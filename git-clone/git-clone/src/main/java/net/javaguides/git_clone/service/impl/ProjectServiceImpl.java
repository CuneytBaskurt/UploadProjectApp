package net.javaguides.git_clone.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.git_clone.Exception.ResourceNotFoundException;
import net.javaguides.git_clone.dto.ProjectDto;
import net.javaguides.git_clone.entity.Project;
import net.javaguides.git_clone.mapper.ProjectMapper;
import net.javaguides.git_clone.mapper.UserMapper;
import net.javaguides.git_clone.repository.ProjectRepository;
import net.javaguides.git_clone.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;



    @Override
    public ProjectDto createProject(ProjectDto projectDto) {
        Project project = ProjectMapper.mapToProject(projectDto);
        Project savedProject = projectRepository.save(project);
        return ProjectMapper.mapToProjectDto(savedProject);
    }

    @Override
    public ProjectDto getProjectById(Long userId) {
        Project project = projectRepository.findById(userId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Project is not exist with given id : " + userId));
        return ProjectMapper.mapToProjectDto(project);
    }

    @Override
    public List<ProjectDto> getAllProjectsByProjectOwnerId(Long projectOwnerId) {

        List<Project> projects = projectRepository.findByProjectOwnerId(projectOwnerId);
        return projects.stream().map((project) -> ProjectMapper.mapToProjectDto(project))
                .collect(Collectors.toList());


    }


}
