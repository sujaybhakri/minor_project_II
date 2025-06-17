package com.fitconnect.system.controller;

import com.fitconnect.system.model.Attendance;
import com.fitconnect.system.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable Long id) {
        return attendanceService.getAttendanceById(id)
                .map(attendance -> ResponseEntity.ok().body(attendance))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Attendance> getAttendanceByUserId(@PathVariable Long userId) {
        return attendanceService.getAttendanceByUserId(userId);
    }

    @PostMapping("/checkin/{userId}")
    public ResponseEntity<Attendance> checkIn(@PathVariable Long userId) {
        try {
            Attendance attendance = attendanceService.checkIn(userId);
            return ResponseEntity.ok(attendance);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/checkout/{userId}")
    public ResponseEntity<Attendance> checkOut(@PathVariable Long userId) {
        try {
            Attendance attendance = attendanceService.checkOut(userId);
            return ResponseEntity.ok(attendance);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/range")
    public List<Attendance> getAttendanceByDateRange(@RequestParam String startDate,
                                                     @RequestParam String endDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        return attendanceService.getAttendanceByDateRange(start, end);
    }
}

