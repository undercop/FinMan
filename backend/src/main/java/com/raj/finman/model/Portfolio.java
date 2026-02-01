package com.raj.finman.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "portfolios")
@Data
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g., "My Main Portfolio"

    // OneToOne ensures a user ID can only appear once in this table
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    private User user;
}