package com.fitconnect.system.repository;

import com.fitconnect.system.model.WorkoutProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WorkoutProgramRepository extends JpaRepository<WorkoutProgram, Long> {
    List<WorkoutProgram> findByTrainerId(Long trainerId);
    List<WorkoutProgram> findByMemberId(Long memberId);
    List<WorkoutProgram> findByTrainerIdAndMemberId(Long trainerId, Long memberId);
}

