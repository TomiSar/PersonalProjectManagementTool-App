package com.fsapplication.ppmtool.services;

import com.fsapplication.ppmtool.entity.User;
import com.fsapplication.ppmtool.exceptions.UsernameAlreadyExistsException;
import com.fsapplication.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        } catch (Exception ex) {
            throw new UsernameAlreadyExistsException("Username: " + newUser.getUsername() + " already exists");
        }
    }

    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

//    public User getUserById(Long id) {
//        return userRepository.getUserById(id);
//    }

    // TO_DO Check functional Logic
//    public User updateUserByUsername(User user, String username) {
//        User existingUser = userRepository.findByUsername(username);
//
//        if (existingUser == null) {
//            throw new UsernameAlreadyExistsException("Username: " + username + " does not exist");
//        }
//
//        // Check if the new username already exists and is not the current user
//        if (!username.equals(user.getUsername())) {
//            User userWithNewUsername = userRepository.findByUsername(user.getUsername());
//            if (userWithNewUsername != null) {
//                throw new UsernameAlreadyExistsException("Username: " + user.getUsername() + " already exists");
//            }
//            existingUser.setUsername(user.getUsername());
//        }
//
//        // Update allowed fields
//        if (user.getFullName() != null) {
//            existingUser.setFullName(user.getFullName());
//        }
//
//        // Only update password if it's provided and confirmed correctly
//        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
//            if (user.getPassword().equals(user.getConfirmPassword())) {
//                existingUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//            } else {
//                throw new IllegalArgumentException("Password and Confirm password do not match");
//            }
//        }
//
//        existingUser.setUpdate_At(new Date());
//
//        return userRepository.save(existingUser);
//    }
}
