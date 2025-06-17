package com.fitconnect.system.controller;

import com.fitconnect.system.dto.UserDTO;
import com.fitconnect.system.model.User;
import com.fitconnect.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:5174")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        return userService.getUserByEmail(email)
                .filter(user -> user.getPassword().equals(password)) // In production, use proper password encoding
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", "dummy-token"); // In production, generate a real JWT token
                    
                    // Create a simplified user object for the frontend
                    Map<String, Object> userResponse = new HashMap<>();
                    userResponse.put("id", user.getId());
                    userResponse.put("name", user.getName());
                    userResponse.put("email", user.getEmail());
                    userResponse.put("role", user.getRole().getName());
                    
                    response.put("user", userResponse);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials")));
    }

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:5174")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        try {
            User user = userService.createUserFromDTO(userDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("token", "dummy-token"); // In production, generate a real JWT token
            
            // Create a simplified user object for the frontend
            Map<String, Object> userResponse = new HashMap<>();
            userResponse.put("id", user.getId());
            userResponse.put("name", user.getName());
            userResponse.put("email", user.getEmail());
            userResponse.put("role", user.getRole().getName());
            
            response.put("user", userResponse);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 