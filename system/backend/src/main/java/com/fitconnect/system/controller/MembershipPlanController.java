package com.fitconnect.system.controller;

import com.fitconnect.system.model.MembershipPlan;
import com.fitconnect.system.service.MembershipPlanService;
import com.fitconnect.system.dto.MembershipPlanDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/membership-plans")
@CrossOrigin(origins = "*")
public class MembershipPlanController {

    @Autowired
    private MembershipPlanService membershipPlanService;

    @GetMapping
    public List<MembershipPlan> getAllMembershipPlans() {
        return membershipPlanService.getAllMembershipPlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipPlan> getMembershipPlanById(@PathVariable Long id) {
        return membershipPlanService.getMembershipPlanById(id)
                .map(plan -> ResponseEntity.ok().body(plan))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MembershipPlan createMembershipPlan(@RequestBody MembershipPlanDTO planDetails) {
        return membershipPlanService.createMembershipPlan(planDetails);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MembershipPlan> updateMembershipPlan(@PathVariable Long id,
                                                               @RequestBody MembershipPlanDTO planDetails) {
        try {
            MembershipPlan updatedPlan = membershipPlanService.updateMembershipPlan(id, planDetails);
            return ResponseEntity.ok(updatedPlan);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMembershipPlan(@PathVariable Long id) {
        try {
            membershipPlanService.deleteMembershipPlan(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

