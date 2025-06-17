package com.fitconnect.system.service;

import com.fitconnect.system.dto.MembershipCreateDTO;
import com.fitconnect.system.dto.MembershipResponseDTO;
import com.fitconnect.system.dto.MembershipUpdateDTO;
import com.fitconnect.system.model.Membership;
import com.fitconnect.system.model.MembershipPlan;
import com.fitconnect.system.model.User;
import com.fitconnect.system.repository.MembershipPlanRepository;
import com.fitconnect.system.repository.MembershipRepository;
import com.fitconnect.system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MembershipService {

    @Autowired
    private MembershipRepository membershipRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MembershipPlanRepository membershipPlanRepository;

    private MembershipResponseDTO convertToDTO(Membership membership) {
        MembershipResponseDTO dto = new MembershipResponseDTO();
        dto.setId(membership.getId());
        dto.setUserId(membership.getUser().getId());
        dto.setUserName(membership.getUser().getName());
        dto.setPlanId(membership.getPlan().getId());
        dto.setPlanName(membership.getPlan().getName());
        dto.setPlanPrice(membership.getPlan().getPrice());
        dto.setStartDate(membership.getStartDate());
        dto.setEndDate(membership.getEndDate());
        dto.setIsActive(membership.getIsActive());
        return dto;
    }

    public List<MembershipResponseDTO> getAllMemberships() {
        return membershipRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<MembershipResponseDTO> getMembershipById(Long id) {
        return membershipRepository.findById(id)
                .map(this::convertToDTO);
    }

    public List<MembershipResponseDTO> getMembershipsByUserId(Long userId) {
        return membershipRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<MembershipResponseDTO> getActiveMembershipByUserId(Long userId) {
        return membershipRepository.findActiveByUserId(userId)
                .map(this::convertToDTO);
    }

    public MembershipResponseDTO createMembershipFromDTO(MembershipCreateDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        MembershipPlan plan = membershipPlanRepository.findById(dto.getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        LocalDate startDate = dto.getStartDate();
        LocalDate endDate = startDate.plusDays(plan.getDurationDays());
        // example logic

        Membership membership = new Membership();
        membership.setUser(user);
        membership.setPlan(plan);
        membership.setStartDate(startDate);
        membership.setEndDate(endDate);
        membership.setIsActive(true);

        return convertToDTO(membershipRepository.save(membership));
    }

    public MembershipResponseDTO updateMembership(Long id, MembershipUpdateDTO dto) {
        Membership membership = membershipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membership not found with id: " + id));

        if (dto.getPlanId() != null) {
            MembershipPlan plan = membershipPlanRepository.findById(dto.getPlanId())
                    .orElseThrow(() -> new RuntimeException("Plan not found with id: " + dto.getPlanId()));
            membership.setPlan(plan);
        }

        if (dto.getStartDate() != null) {
            membership.setStartDate(dto.getStartDate());
        }

        if (dto.getEndDate() != null) {
            membership.setEndDate(dto.getEndDate());
        }

        if (dto.getIsActive() != null) {
            membership.setIsActive(dto.getIsActive());
        }

        return convertToDTO(membershipRepository.save(membership));
    }

    public void deactivateMembership(Long id) {
        Membership membership = membershipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membership not found with id: " + id));

        membership.setIsActive(false);
        membershipRepository.save(membership);
    }

    public List<MembershipResponseDTO> getExpiredMemberships() {
        return membershipRepository.findExpiredMemberships(LocalDate.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}

