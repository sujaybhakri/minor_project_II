package com.fitconnect.system.service;

import com.fitconnect.system.model.SessionBooking;
import com.fitconnect.system.repository.SessionBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SessionBookingService {

    @Autowired
    private SessionBookingRepository sessionBookingRepository;

    public List<SessionBooking> getAllSessionBookings() {
        return sessionBookingRepository.findAll();
    }

    public Optional<SessionBooking> getSessionBookingById(Long id) {
        return sessionBookingRepository.findById(id);
    }

    public List<SessionBooking> getSessionBookingsByMember(Long memberId) {
        return sessionBookingRepository.findByMemberId(memberId);
    }

    public List<SessionBooking> getSessionBookingsByTrainer(Long trainerId) {
        return sessionBookingRepository.findByTrainerId(trainerId);
    }

    public List<SessionBooking> getSessionBookingsByStatus(SessionBooking.BookingStatus status) {
        return sessionBookingRepository.findByStatus(status);
    }

    public SessionBooking createSessionBooking(SessionBooking sessionBooking) {
        return sessionBookingRepository.save(sessionBooking);
    }

    public SessionBooking updateSessionBooking(Long id, SessionBooking bookingDetails) {
        SessionBooking booking = sessionBookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session booking not found with id: " + id));

        booking.setSessionDate(bookingDetails.getSessionDate());
        booking.setStartTime(bookingDetails.getStartTime());
        booking.setEndTime(bookingDetails.getEndTime());
        booking.setStatus(bookingDetails.getStatus());

        return sessionBookingRepository.save(booking);
    }

    public SessionBooking updateBookingStatus(Long id, SessionBooking.BookingStatus status) {
        SessionBooking booking = sessionBookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session booking not found with id: " + id));

        booking.setStatus(status);
        return sessionBookingRepository.save(booking);
    }

    public void deleteSessionBooking(Long id) {
        if (!sessionBookingRepository.existsById(id)) {
            throw new RuntimeException("Session booking not found with id: " + id);
        }
        sessionBookingRepository.deleteById(id);
    }
}

