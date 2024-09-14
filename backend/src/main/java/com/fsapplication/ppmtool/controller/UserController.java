package com.fsapplication.ppmtool.controller;

import com.fsapplication.ppmtool.entity.User;
import com.fsapplication.ppmtool.payload.JWTLoginSuccessResponse;
import com.fsapplication.ppmtool.payload.LoginRequest;
import com.fsapplication.ppmtool.security.JwtTokenProvider;
import com.fsapplication.ppmtool.services.UserService;
import com.fsapplication.ppmtool.util.ValidationUtil;
import com.fsapplication.ppmtool.validator.UserValidator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import static com.fsapplication.ppmtool.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserValidator userValidator;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final ValidationUtil validationUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        // Validate password and errors
        userValidator.validate(user, result);
        validationUtil.handleValidationErrors(result);

        User newUser = userService.saveUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        validationUtil.handleValidationErrors(result);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

    @GetMapping("/all")
    public Iterable<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUser(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    // TO_DO Check functional Logic
//    @PatchMapping("/{username}")
//    public ResponseEntity<?> updateUser(@Valid @RequestBody User user, BindingResult result, @PathVariable String username) {
//        userValidator.validate(user, result);
//        validationUtil.handleValidationErrors(result);
//        User updatedUser = userService.updateUserByUsername(user, username);
//        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
//    }
}