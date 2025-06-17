package com.fitconnect.system.service;

import com.fitconnect.system.model.WorkoutProgram;
import com.fitconnect.system.repository.WorkoutProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutProgramService {

    @Autowired
    private WorkoutProgramRepository workoutProgramRepository;

    public List<WorkoutProgram> getAllWorkoutPrograms() {
        return workoutProgramRepository.findAll();
    }

    public Optional<WorkoutProgram> getWorkoutProgramById(Long id) {
        return workoutProgramRepository.findById(id);
    }

    public List<WorkoutProgram> getWorkoutProgramsByTrainer(Long trainerId) {
        return workoutProgramRepository.findByTrainerId(trainerId);
    }

    public List<WorkoutProgram> getWorkoutProgramsByMember(Long memberId) {
        return workoutProgramRepository.findByMemberId(memberId);
    }

    public WorkoutProgram createWorkoutProgram(WorkoutProgram workoutProgram) {
        return workoutProgramRepository.save(workoutProgram);
    }

    public WorkoutProgram updateWorkoutProgram(Long id, WorkoutProgram programDetails) {
        WorkoutProgram program = workoutProgramRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout program not found with id: " + id));

        program.setTitle(programDetails.getTitle());
        program.setDescription(programDetails.getDescription());
        if (programDetails.getTrainer() != null) {
            program.setTrainer(programDetails.getTrainer());
        }
        if (programDetails.getMember() != null) {
            program.setMember(programDetails.getMember());
        }

        return workoutProgramRepository.save(program);
    }

    public void deleteWorkoutProgram(Long id) {
        if (!workoutProgramRepository.existsById(id)) {
            throw new RuntimeException("Workout program not found with id: " + id);
        }
        workoutProgramRepository.deleteById(id);
    }
}

