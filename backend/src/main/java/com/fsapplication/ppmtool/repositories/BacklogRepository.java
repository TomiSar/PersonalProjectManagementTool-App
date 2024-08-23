package com.fsapplication.ppmtool.repositories;

import com.fsapplication.ppmtool.entity.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
    Backlog findByProjectIdentifier(String projectIdentifier);
}
