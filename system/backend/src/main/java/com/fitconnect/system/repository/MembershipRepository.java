package com.fitconnect.system.repository;

import com.fitconnect.system.model.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {
    List<Membership> findByUserId(Long userId);
    List<Membership> findByPlanId(Long planId);

    @Query("SELECT m FROM Membership m WHERE m.user.id = :userId AND m.isActive = true")
    Optional<Membership> findActiveByUserId(@Param("userId") Long userId);

    @Query("SELECT m FROM Membership m WHERE m.endDate < :date AND m.isActive = true")
    List<Membership> findExpiredMemberships(@Param("date") LocalDate date);

    @Query("SELECT COALESCE(SUM(m.plan.price), 0) FROM Membership m WHERE m.startDate >= :startDate AND m.isActive = true")
    BigDecimal calculateMonthlyRevenue(@Param("startDate") LocalDate startDate);

    @Query("SELECT COUNT(m) FROM Membership m WHERE m.isActive = true")
    Long getTodayAttendance();

    @Query("SELECT COUNT(m) FROM Membership m WHERE m.endDate BETWEEN :startDate AND :endDate AND m.isActive = true")
    Long countExpiringMemberships(@Param("startDate") java.time.LocalDate startDate, @Param("endDate") java.time.LocalDate endDate);

    @Query("SELECT new map(m.plan.name as plan, COUNT(m) as count, " +
           "ROUND(COUNT(m) * 100.0 / (SELECT COUNT(*) FROM Membership m2 WHERE m2.isActive = true), 1) as percentage) " +
           "FROM Membership m WHERE m.isActive = true " +
           "GROUP BY m.plan.name")
    List<Map<String, Object>> getMembershipDistribution();
}

