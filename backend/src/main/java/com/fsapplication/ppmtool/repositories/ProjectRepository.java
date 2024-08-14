package com.fsapplication.ppmtool.repositories;

import com.fsapplication.ppmtool.entity.Project;
import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository extends CrudRepository<Project, Long> {

//    @Override
//    Iterable<Project> findAllById(Iterable<Long> iterable);
}
