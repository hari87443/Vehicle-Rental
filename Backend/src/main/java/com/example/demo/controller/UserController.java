package com.example.demo.controller;

import com.example.demo.vehiclerental.User;
import com.example.demo.vehiclerepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users") // ✅ unified API prefix for frontend
@CrossOrigin(origins = "http://localhost:5173") // ✅ fixed CORS
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ User registration
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // prevent duplicate registration
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered!");
        }

        user.setRole(User.Role.USER);
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    // ✅ User login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmailAndPasswordAndRole(
                user.getEmail(), user.getPassword(), User.Role.USER
        );

        if (existingUser.isPresent()) {
            // ✅ Return user info (including id) to store in localStorage
            return ResponseEntity.ok(existingUser.get());
        }

        return ResponseEntity.status(401).body("Invalid user credentials");
    }
}
