package com.fsapplication.ppmtool.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Project Name is required")
    private String projectName;

    @NotBlank(message = "Project identifier is required")
    @Size(min = 4, max= 5, message = "Please enter 4-5 character Unique ID")
    @Column(updatable = false, unique = true)
    private String projectIdentifier;

    @NotBlank(message = "Project Description is required")
    private String description;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date start_date;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date end_date;

    @JsonFormat(pattern = "dd-MM-yyyy")
    @Column(updatable = false)
    private Date created_At;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date updated_At;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "project")
//    @JsonIgnore
    private Backlog backlog;

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }
}
