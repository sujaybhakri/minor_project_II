package com.fitconnect.system.repository;

import com.fitconnect.system.model.TrainerAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TrainerAvailabilityRepository extends JpaRepository<TrainerAvailability, Long> {
    List<TrainerAvailability> findByTrainerId(Long trainerId);

    @Query("SELECT ta FROM TrainerAvailability ta WHERE ta.trainer.id = :trainerId AND ta.availableDate = :date")
    List<TrainerAvailability> findByTrainerIdAndDate(@Param("trainerId") Long trainerId,
                                                     @Param("date") LocalDate date);

    @Query("SELECT ta FROM TrainerAvailability ta WHERE ta.availableDate BETWEEN :startDate AND :endDate")
    List<TrainerAvailability> findByDateRange(@Param("startDate") LocalDate startDate,
                                              @Param("endDate") LocalDate endDate);
}
