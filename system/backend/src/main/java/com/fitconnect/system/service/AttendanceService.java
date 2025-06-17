package com.fitconnect.system.service;


import com.fitconnect.system.model.Attendance;
import com.fitconnect.system.model.User;
import com.fitconnect.system.repository.AttendanceRepository;
import com.fitconnect.system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Optional<Attendance> getAttendanceById(Long id) {
        return attendanceRepository.findById(id);
    }

    public List<Attendance> getAttendanceByUserId(Long userId) {
        return attendanceRepository.findByUserId(userId);
    }

    public Attendance checkIn(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Check if user is already checked in
        Optional<Attendance> activeAttendance = attendanceRepository.findActiveAttendanceByUserId(userId);
        if (activeAttendance.isPresent()) {
            throw new RuntimeException("User is already checked in");
        }

        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setCheckInTime(LocalDateTime.now());

        return attendanceRepository.save(attendance);
    }

    public Attendance checkOut(Long userId) {
        Optional<Attendance> activeAttendance = attendanceRepository.findActiveAttendanceByUserId(userId);
        if (!activeAttendance.isPresent()) {
            throw new RuntimeException("No active check-in found for user");
        }

        Attendance attendance = activeAttendance.get();
        attendance.setCheckOutTime(LocalDateTime.now());

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return attendanceRepository.findByDateRange(startDate, endDate);
    }
}
