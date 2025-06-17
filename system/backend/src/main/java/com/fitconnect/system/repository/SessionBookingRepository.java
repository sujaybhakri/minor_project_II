package com.fitconnect.system.repository;

import com.fitconnect.system.model.SessionBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface SessionBookingRepository extends JpaRepository<SessionBooking, Long> {
    List<SessionBooking> findByMemberId(Long memberId);
    List<SessionBooking> findByTrainerId(Long trainerId);
    List<SessionBooking> findByStatus(SessionBooking.BookingStatus status);

    @Query("SELECT sb FROM SessionBooking sb WHERE sb.trainer.id = :trainerId AND sb.sessionDate = :date")
    List<SessionBooking> findByTrainerIdAndDate(@Param("trainerId") Long trainerId,
                                                @Param("date") LocalDate date);

    @Query("SELECT sb FROM SessionBooking sb WHERE sb.member.id = :memberId AND sb.sessionDate = :date")
    List<SessionBooking> findByMemberIdAndDate(@Param("memberId") Long memberId,
                                               @Param("date") LocalDate date);
}

