package com.fitconnect.system.controller;

import com.fitconnect.system.model.TrainerAvailability;
import com.fitconnect.system.service.TrainerAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/trainer-availability")
@CrossOrigin(origins = "*")
public class TrainerAvailabilityController {

    @Autowired
    private TrainerAvailabilityService trainerAvailabilityService;

    @GetMapping
    public List<TrainerAvailability> getAllTrainerAvailabilities() {
        return trainerAvailabilityService.getAllTrainerAvailabilities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainerAvailability> getTrainerAvailabilityById(@PathVariable Long id) {
        return trainerAvailabilityService.getTrainerAvailabilityById(id)
                .map(availability -> ResponseEntity.ok().body(availability))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/trainer/{trainerId}")
    public List<TrainerAvailability> getTrainerAvailabilityByTrainer(@PathVariable Long trainerId) {
        return trainerAvailabilityService.getTrainerAvailabilityByTrainer(trainerId);
    }

    @GetMapping("/trainer/{trainerId}/date/{date}")
    public List<TrainerAvailability> getTrainerAvailabilityByTrainerAndDate(@PathVariable Long trainerId,
                                                                            @PathVariable String date) {
        LocalDate availableDate = LocalDate.parse(date);
        return trainerAvailabilityService.getTrainerAvailabilityByTrainerAndDate(trainerId, availableDate);
    }

    @PostMapping
    public TrainerAvailability createTrainerAvailability(@RequestBody TrainerAvailability availability) {
        return trainerAvailabilityService.createTrainerAvailability(availability);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrainerAvailability> updateTrainerAvailability(@PathVariable Long id,
                                                                         @RequestBody TrainerAvailability availabilityDetails) {
        try {
            TrainerAvailability updatedAvailability = trainerAvailabilityService.updateTrainerAvailability(id, availabilityDetails);
            return ResponseEntity.ok(updatedAvailability);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrainerAvailability(@PathVariable Long id) {
        try {
            trainerAvailabilityService.deleteTrainerAvailability(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
