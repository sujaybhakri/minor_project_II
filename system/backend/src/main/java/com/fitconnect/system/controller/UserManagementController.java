package com.fitconnect.system.controller;

import com.fitconnect.system.model.User;
import com.fitconnect.system.model.Role;
import com.fitconnect.system.repository.UserRepository;
import com.fitconnect.system.repository.RoleRepository;
import com.fitconnect.system.dto.UserManagementDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-management")
@CrossOrigin(origins = "*")
public class UserManagementController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // List all users
    @GetMapping("/users")
    public List<UserManagementDTO> getAllUsers(@RequestParam(value = "role", required = false) String role) {
        if (role != null) {
            return userRepository.findAll().stream()
                .filter(user -> user.getRole() != null && role.equalsIgnoreCase(user.getRole().getName()))
                .map(user -> {
                    UserManagementDTO dto = new UserManagementDTO();
                    dto.setId(user.getId());
                    dto.setName(user.getName());
                    dto.setEmail(user.getEmail());
                    dto.setRoleName(user.getRole() != null ? user.getRole().getName() : null);
                    dto.setCreatedAt(user.getCreatedAt());
                    return dto;
                }).toList();
        } else {
            return userRepository.findAll().stream().map(user -> {
                UserManagementDTO dto = new UserManagementDTO();
                dto.setId(user.getId());
                dto.setName(user.getName());
                dto.setEmail(user.getEmail());
                dto.setRoleName(user.getRole() != null ? user.getRole().getName() : null);
                dto.setCreatedAt(user.getCreatedAt());
                return dto;
            }).toList();
        }
    }

    // Get user by ID
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update user (name, email, role)
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = userOpt.get();
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        if (updatedUser.getRole() != null && updatedUser.getRole().getId() != null) {
            Optional<Role> roleOpt = roleRepository.findById(updatedUser.getRole().getId());
            roleOpt.ifPresent(user::setRole);
        }
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
} 