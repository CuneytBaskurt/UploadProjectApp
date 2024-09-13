package net.javaguides.git_clone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_title" , nullable = false)
    private String title;

    @Column(name = "project_language" , nullable = false)
    private String language;

    @Column(name = "project_explanation" , nullable = false)
    private String explanation;

    @Column(name = "project_owner_id" , nullable = false)
    private Long projectOwnerId;





}
