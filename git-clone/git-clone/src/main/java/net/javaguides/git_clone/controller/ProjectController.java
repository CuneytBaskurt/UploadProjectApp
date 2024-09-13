package net.javaguides.git_clone.controller;


import lombok.AllArgsConstructor;
import net.javaguides.git_clone.dto.ProjectDto;
import net.javaguides.git_clone.service.ProjectService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/projects")
public class ProjectController {

    private ProjectService projectService;

    @PostMapping("/register")
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto){

        ProjectDto savedProject = projectService.createProject(projectDto);
        return new ResponseEntity<>(savedProject , HttpStatus.CREATED);
    }

    @GetMapping("/getProject/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable("id") Long userId){

        ProjectDto projectDto = projectService.getProjectById(userId);

        return ResponseEntity.ok(projectDto);

    }

    @GetMapping("/getAllProjectsByProjectOwnerId/{projectOwnerId}")
    public ResponseEntity<List<ProjectDto>> getAllProjectsByProjectOwnerId(@PathVariable("projectOwnerId") Long projectOwnerId) {
        List<ProjectDto> projects = projectService.getAllProjectsByProjectOwnerId(projectOwnerId);
        return ResponseEntity.ok(projects);
    }



}
