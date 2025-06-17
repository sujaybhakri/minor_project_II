package com.fitconnect.system.controller;

import com.fitconnect.system.model.SessionBooking;
import com.fitconnect.system.service.SessionBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/session-bookings")
@CrossOrigin(origins = "*")
public class SessionBookingController {

    @Autowired
    private SessionBookingService sessionBookingService;

    @GetMapping
    public List<SessionBooking> getAllSessionBookings() {
        return sessionBookingService.getAllSessionBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessionBooking> getSessionBookingById(@PathVariable Long id) {
        return sessionBookingService.getSessionBookingById(id)
                .map(booking -> ResponseEntity.ok().body(booking))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/member/{memberId}")
    public List<SessionBooking> getSessionBookingsByMember(@PathVariable Long memberId) {
        return sessionBookingService.getSessionBookingsByMember(memberId);
    }

    @GetMapping("/trainer/{trainerId}")
    public List<SessionBooking> getSessionBookingsByTrainer(@PathVariable Long trainerId) {
        return sessionBookingService.getSessionBookingsByTrainer(trainerId);
    }

    @GetMapping("/member/current")
    public ResponseEntity<List<SessionBooking>> getCurrentMemberBookings(Authentication authentication) {
        try {
            Long memberId = Long.parseLong(authentication.getName());
            List<SessionBooking> bookings = sessionBookingService.getSessionBookingsByMember(memberId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/trainer/current")
    public ResponseEntity<List<SessionBooking>> getCurrentTrainerBookings(Authentication authentication) {
        try {
            Long trainerId = Long.parseLong(authentication.getName());
            List<SessionBooking> bookings = sessionBookingService.getSessionBookingsByTrainer(trainerId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/status/{status}")
    public List<SessionBooking> getSessionBookingsByStatus(@PathVariable String status) {
        SessionBooking.BookingStatus bookingStatus = SessionBooking.BookingStatus.valueOf(status.toUpperCase());
        return sessionBookingService.getSessionBookingsByStatus(bookingStatus);
    }

    @PostMapping
    public SessionBooking createSessionBooking(@RequestBody SessionBooking sessionBooking) {
        return sessionBookingService.createSessionBooking(sessionBooking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SessionBooking> updateSessionBooking(@PathVariable Long id,
                                                               @RequestBody SessionBooking bookingDetails) {
        try {
            SessionBooking updatedBooking = sessionBookingService.updateSessionBooking(id, bookingDetails);
            return ResponseEntity.ok(updatedBooking);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SessionBooking> updateBookingStatus(@PathVariable Long id,
                                                              @RequestParam String status) {
        try {
            SessionBooking.BookingStatus bookingStatus = SessionBooking.BookingStatus.valueOf(status.toUpperCase());
            SessionBooking updatedBooking = sessionBookingService.updateBookingStatus(id, bookingStatus);
            return ResponseEntity.ok(updatedBooking);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSessionBooking(@PathVariable Long id) {
        try {
            sessionBookingService.deleteSessionBooking(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

