package com.fitconnect.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class MembershipResponseDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Long planId;
    private String planName;
    private BigDecimal planPrice;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    
    private Boolean isActive;
} 