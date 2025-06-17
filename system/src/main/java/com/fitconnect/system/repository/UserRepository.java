package com.fitconnect.system.repository;

import com.fitconnect.system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.role.id = :roleId")
    List<User> findByRoleId(@Param("roleId") Long roleId);

    @Query("SELECT u FROM User u WHERE u.role.id = 2") // Trainer role ID
    List<User> findAllTrainers();

    @Query("SELECT u FROM User u WHERE u.role.id = 3") // Member role ID
    List<User> findAllMembers();

    @Query("SELECT u FROM User u WHERE u.role.id = 3 AND u.createdAt >= :date ORDER BY u.createdAt DESC") // Member role ID
    List<User> findRecentMembers(@Param("date") LocalDateTime date);
}
