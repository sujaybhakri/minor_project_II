package com.fitconnect.system.service;

import com.fitconnect.system.model.User;
import com.fitconnect.system.repository.MembershipRepository;
import com.fitconnect.system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MembershipRepository membershipRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Get total members and trainers
        long totalMembers = userRepository.findAllMembers().size();
        long totalTrainers = userRepository.findAllTrainers().size();
        
        // Calculate monthly revenue (last 30 days)
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        BigDecimal monthlyRevenue = membershipRepository.calculateMonthlyRevenue(thirtyDaysAgo);
        
        // Get today's attendance (active memberships)
        long todayAttendance = membershipRepository.getTodayAttendance();
        
        stats.put("totalMembers", totalMembers);
        stats.put("totalTrainers", totalTrainers);
        stats.put("monthlyRevenue", monthlyRevenue.doubleValue());
        stats.put("todayAttendance", todayAttendance);
        
        return stats;
    }

    public List<Map<String, Object>> getRecentMembers() {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        return userRepository.findRecentMembers(thirtyDaysAgo).stream()
            .map(user -> {
                Map<String, Object> memberData = new HashMap<>();
                memberData.put("name", user.getName());
                memberData.put("email", user.getEmail());
                memberData.put("joinDate", user.getCreatedAt());
                memberData.put("status", "Active"); // You might want to calculate this based on membership status
                return memberData;
            })
            .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getMembershipStats() {
        return membershipRepository.getMembershipDistribution();
    }

    public List<Map<String, Object>> getSystemAlerts() {
        List<Map<String, Object>> alerts = new ArrayList<>();
        java.time.LocalDate today = java.time.LocalDate.now();
        java.time.LocalDate weekFromNow = today.plusDays(7);
        long expiringMemberships = membershipRepository.countExpiringMemberships(today, weekFromNow);
        if (expiringMemberships > 0) {
            Map<String, Object> alert = new HashMap<>();
            alert.put("type", "warning");
            alert.put("message", expiringMemberships + " memberships expiring this week");
            alert.put("time", "Just now");
            alerts.add(alert);
        }
        return alerts;
    }
} 