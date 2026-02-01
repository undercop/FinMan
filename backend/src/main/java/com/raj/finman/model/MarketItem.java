package com.raj.finman.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "market_items")
@Data
public class MarketItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String symbol; // e.g., "GOLD", "AAPL"

    private String name;   // e.g., "Gold Bullion", "Apple Inc."

    @Enumerated(EnumType.STRING)
    private AssetCategory category;

    private Double currentPrice;
    private Double openingPrice; // Used to calculate daily % change
}
