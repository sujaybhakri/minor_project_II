package com.fitconnect.system.controller;

import com.fitconnect.system.dto.MembershipCreateDTO;
import com.fitconnect.system.dto.MembershipResponseDTO;
import com.fitconnect.system.dto.MembershipUpdateDTO;
import com.fitconnect.system.service.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/memberships")
@CrossOrigin(origins = "*")
public class MembershipController {

    @Autowired
    private MembershipService membershipService;

    @GetMapping
    public List<MembershipResponseDTO> getAllMemberships() {
        return membershipService.getAllMemberships();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipResponseDTO> getMembershipById(@PathVariable Long id) {
        return membershipService.getMembershipById(id)
                .map(membership -> ResponseEntity.ok().body(membership))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<MembershipResponseDTO> getMembershipsByUserId(@PathVariable Long userId) {
        return membershipService.getMembershipsByUserId(userId);
    }

    @GetMapping("/user/{userId}/active")
    public ResponseEntity<MembershipResponseDTO> getActiveMembershipByUserId(@PathVariable Long userId) {
        return membershipService.getActiveMembershipByUserId(userId)
                .map(membership -> ResponseEntity.ok().body(membership))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MembershipResponseDTO> createMembership(@RequestBody MembershipCreateDTO dto) {
        try {
            MembershipResponseDTO membership = membershipService.createMembershipFromDTO(dto);
            return ResponseEntity.ok(membership);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MembershipResponseDTO> updateMembership(@PathVariable Long id,
                                                       @RequestBody MembershipUpdateDTO dto) {
        try {
            MembershipResponseDTO updated = membershipService.updateMembership(id, dto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateMembership(@PathVariable Long id) {
        try {
            membershipService.deactivateMembership(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/expired")
    public List<MembershipResponseDTO> getExpiredMemberships() {
        return membershipService.getExpiredMemberships();
    }
}

