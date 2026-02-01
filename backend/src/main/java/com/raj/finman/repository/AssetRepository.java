package com.raj.finman.repository;

import com.raj.finman.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    // Find a specific stock in a specific portfolio
    Optional<Asset> findByPortfolioIdAndSymbol(Long portfolioId, String symbol);

    // Get all assets for a portfolio
    List<Asset> findByPortfolioId(Long portfolioId);
}