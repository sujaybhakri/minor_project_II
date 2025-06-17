package com.fitconnect.system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

//    @Column(nullable = false)
//    private String phoneno;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private Role role;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Membership> memberships;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<WorkoutProgram> trainedPrograms;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<WorkoutProgram> memberPrograms;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<TrainerAvailability> availabilities;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<SessionBooking> memberBookings;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<SessionBooking> trainerBookings;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
