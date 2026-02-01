package com.raj.finman.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String symbol;      // e.g., "GOLD", "AAPL"
    private Double quantity;
    private Double priceAtTransaction;
    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private TransactionType type; // BUY or SELL
}