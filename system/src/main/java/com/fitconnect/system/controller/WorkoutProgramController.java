package com.fitconnect.system.controller;

import com.fitconnect.system.model.WorkoutProgram;
import com.fitconnect.system.service.WorkoutProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/workout-programs")
@CrossOrigin(origins = "*")
public class WorkoutProgramController {

    @Autowired
    private WorkoutProgramService workoutProgramService;

    @GetMapping
    public List<WorkoutProgram> getAllWorkoutPrograms() {
        return workoutProgramService.getAllWorkoutPrograms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutProgram> getWorkoutProgramById(@PathVariable Long id) {
        return workoutProgramService.getWorkoutProgramById(id)
                .map(program -> ResponseEntity.ok().body(program))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/trainer/{trainerId}")
    public List<WorkoutProgram> getWorkoutProgramsByTrainer(@PathVariable Long trainerId) {
        return workoutProgramService.getWorkoutProgramsByTrainer(trainerId);
    }

    @GetMapping("/member/{memberId}")
    public List<WorkoutProgram> getWorkoutProgramsByMember(@PathVariable Long memberId) {
        return workoutProgramService.getWorkoutProgramsByMember(memberId);
    }

    @PostMapping
    public WorkoutProgram createWorkoutProgram(@RequestBody WorkoutProgram workoutProgram) {
        return workoutProgramService.createWorkoutProgram(workoutProgram);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutProgram> updateWorkoutProgram(@PathVariable Long id,
                                                               @RequestBody WorkoutProgram programDetails) {
        try {
            WorkoutProgram updatedProgram = workoutProgramService.updateWorkoutProgram(id, programDetails);
            return ResponseEntity.ok(updatedProgram);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkoutProgram(@PathVariable Long id) {
        try {
            workoutProgramService.deleteWorkoutProgram(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

