package com.fitconnect.system.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class MembershipPlanDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private Integer durationDays;
    private String description;
} 