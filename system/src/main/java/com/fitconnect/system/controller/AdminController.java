package com.fitconnect.system.controller;

import com.fitconnect.system.model.User;
import com.fitconnect.system.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<?> getDashboardStats() {
        try {
            logger.info("Fetching dashboard stats");
            Map<String, Object> stats = adminService.getDashboardStats();
            logger.info("Dashboard stats: {}", stats);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            logger.error("Error fetching dashboard stats", e);
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error fetching dashboard stats",
                "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/dashboard/recent-members")
    public ResponseEntity<?> getRecentMembers() {
        try {
            logger.info("Fetching recent members");
            List<Map<String, Object>> members = adminService.getRecentMembers();
            logger.info("Recent members: {}", members);
            return ResponseEntity.ok(members);
        } catch (Exception e) {
            logger.error("Error fetching recent members", e);
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error fetching recent members",
                "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/dashboard/membership-stats")
    public ResponseEntity<?> getMembershipStats() {
        try {
            logger.info("Fetching membership stats");
            List<Map<String, Object>> stats = adminService.getMembershipStats();
            logger.info("Membership stats: {}", stats);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            logger.error("Error fetching membership stats", e);
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error fetching membership stats",
                "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/dashboard/alerts")
    public ResponseEntity<?> getSystemAlerts() {
        try {
            logger.info("Fetching system alerts");
            List<Map<String, Object>> alerts = adminService.getSystemAlerts();
            logger.info("System alerts: {}", alerts);
            return ResponseEntity.ok(alerts);
        } catch (Exception e) {
            logger.error("Error fetching system alerts", e);
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Error fetching system alerts",
                "message", e.getMessage()
            ));
        }
    }
} 