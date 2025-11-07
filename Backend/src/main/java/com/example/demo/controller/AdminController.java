package com.example.demo.controller;

import com.example.demo.vehiclerental.User;
import com.example.demo.vehiclerepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:5173/")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerAdmin(@RequestBody User admin) {
        Optional<User> existing = userRepository.findByEmail(admin.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered!");
        }

        admin.setRole(User.Role.ADMIN);
        userRepository.save(admin);
        return ResponseEntity.ok("Admin registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody User admin) {
        Optional<User> existingAdmin = userRepository.findByEmailAndPasswordAndRole(
                admin.getEmail(),
                admin.getPassword(),
                User.Role.ADMIN
        );
        if (existingAdmin.isPresent()) {
            return ResponseEntity.ok("Admin login successful");
        }
        return ResponseEntity.status(401).body("Invalid admin credentials");
    }
}
