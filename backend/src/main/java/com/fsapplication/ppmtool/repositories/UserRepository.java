package com.fsapplication.ppmtool.repositories;

import com.fsapplication.ppmtool.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
    User getUserById(Long id);
}
