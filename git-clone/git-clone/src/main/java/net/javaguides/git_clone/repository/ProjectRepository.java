package net.javaguides.git_clone.repository;

import net.javaguides.git_clone.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    List<Project> findByProjectOwnerId(Long projectOwnerId);
}
