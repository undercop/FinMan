package com.raj.finman.controller;

import com.raj.finman.model.User;
import com.raj.finman.security.UserContext; // <--- Added this import
import com.raj.finman.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 1. Create a new user (Signup)
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    // 2. Get a user by specific ID (Admin use or Testing)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. NEW ENDPOINT: Get "My" Profile & Wallet Balance
    // Frontend calls this to show "Welcome, Raj! Balance: $9000"
    @GetMapping("/me")
    public ResponseEntity<User> getMyProfile() {
        Long currentUserId = UserContext.getCurrentUserId();
        return userService.getUserById(currentUserId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}