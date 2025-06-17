package com.fitconnect.system.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDate;

@Data
public class MembershipCreateDTO {
    private Long userId;
    private Long planId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
}

