package com.fitconnect.system.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserManagementDTO {
    private Long id;
    private String name;
    private String email;
    private String roleName;
    private LocalDateTime createdAt;
} 