package com.fitconnect.system.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class MembershipUpdateDTO {
    private Long planId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isActive;
}
