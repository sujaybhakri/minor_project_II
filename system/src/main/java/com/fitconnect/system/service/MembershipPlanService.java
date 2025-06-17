package com.fitconnect.system.service;

import com.fitconnect.system.model.MembershipPlan;
import com.fitconnect.system.repository.MembershipPlanRepository;
import com.fitconnect.system.dto.MembershipPlanDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MembershipPlanService {

    @Autowired
    private MembershipPlanRepository membershipPlanRepository;

    public List<MembershipPlan> getAllMembershipPlans() {
        return membershipPlanRepository.findAll();
    }

    public Optional<MembershipPlan> getMembershipPlanById(Long id) {
        return membershipPlanRepository.findById(id);
    }

    public MembershipPlan createMembershipPlan(MembershipPlanDTO dto) {
        if (membershipPlanRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Membership plan with name " + dto.getName() + " already exists");
        }
        MembershipPlan plan = new MembershipPlan();
        plan.setName(dto.getName());
        plan.setPrice(dto.getPrice());
        plan.setDurationDays(dto.getDurationDays());
        plan.setDescription(dto.getDescription());
        return membershipPlanRepository.save(plan);
    }

    public MembershipPlan updateMembershipPlan(Long id, MembershipPlanDTO dto) {
        MembershipPlan plan = membershipPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membership plan not found with id: " + id));

        plan.setName(dto.getName());
        plan.setPrice(dto.getPrice());
        plan.setDurationDays(dto.getDurationDays());
        plan.setDescription(dto.getDescription());

        return membershipPlanRepository.save(plan);
    }

    public void deleteMembershipPlan(Long id) {
        if (!membershipPlanRepository.existsById(id)) {
            throw new RuntimeException("Membership plan not found with id: " + id);
        }
        membershipPlanRepository.deleteById(id);
    }
}
