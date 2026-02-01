package com.raj.finman.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "assets")
@Data
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Which portfolio does this belong to?
    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    private String symbol;      // e.g., "AAPL"
    private String name;        // e.g., "Apple Inc."
    private Double quantity;    // Current Net Quantity
    private Double avgBuyPrice; // Weighted Average Price

    // Helper to calculate current value on the fly
    @Transient // This means "Don't save this to the DB, just calculate it"
    private Double currentMarketPrice;

    @Transient
    private Double profitLoss;
}