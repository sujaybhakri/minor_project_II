package com.fitconnect.system.dto;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private String name;
    private String email;
    private String password;
    private Long roleId;
}

