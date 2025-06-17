package com.fitconnect.system.service;

import com.fitconnect.system.model.TrainerAvailability;
import com.fitconnect.system.repository.TrainerAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TrainerAvailabilityService {

    @Autowired
    private TrainerAvailabilityRepository trainerAvailabilityRepository;

    public List<TrainerAvailability> getAllTrainerAvailabilities() {
        return trainerAvailabilityRepository.findAll();
    }

    public Optional<TrainerAvailability> getTrainerAvailabilityById(Long id) {
        return trainerAvailabilityRepository.findById(id);
    }

    public List<TrainerAvailability> getTrainerAvailabilityByTrainer(Long trainerId) {
        return trainerAvailabilityRepository.findByTrainerId(trainerId);
    }

    public List<TrainerAvailability> getTrainerAvailabilityByTrainerAndDate(Long trainerId, LocalDate date) {
        return trainerAvailabilityRepository.findByTrainerIdAndDate(trainerId, date);
    }

    public TrainerAvailability createTrainerAvailability(TrainerAvailability availability) {
        return trainerAvailabilityRepository.save(availability);
    }

    public TrainerAvailability updateTrainerAvailability(Long id, TrainerAvailability availabilityDetails) {
        TrainerAvailability availability = trainerAvailabilityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer availability not found with id: " + id));

        availability.setAvailableDate(availabilityDetails.getAvailableDate());
        availability.setStartTime(availabilityDetails.getStartTime());
        availability.setEndTime(availabilityDetails.getEndTime());

        return trainerAvailabilityRepository.save(availability);
    }

    public void deleteTrainerAvailability(Long id) {
        if (!trainerAvailabilityRepository.existsById(id)) {
            throw new RuntimeException("Trainer availability not found with id: " + id);
        }
        trainerAvailabilityRepository.deleteById(id);
    }
}
