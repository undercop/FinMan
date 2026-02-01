package com.raj.finman.controller;

import com.raj.finman.model.Asset;
import com.raj.finman.model.MarketItem;
import com.raj.finman.model.Portfolio;
import com.raj.finman.repository.AssetRepository;
import com.raj.finman.repository.MarketItemRepository;
import com.raj.finman.security.UserContext;
import com.raj.finman.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/portfolios")
public class PortfolioController {

    private final PortfolioService portfolioService;

    // NEW: Add these two repositories
    private final AssetRepository assetRepository;
    private final MarketItemRepository marketRepository;

    // NEW: Update constructor to include the new repositories
    public PortfolioController(PortfolioService portfolioService,
                               AssetRepository assetRepository,
                               MarketItemRepository marketRepository) {
        this.portfolioService = portfolioService;
        this.assetRepository = assetRepository;
        this.marketRepository = marketRepository;
    }

    @PostMapping
    public ResponseEntity<Portfolio> create(@RequestBody Portfolio portfolio) {
        return ResponseEntity.ok(portfolioService.createPortfolio(portfolio));
    }

    @GetMapping("/me")
    public ResponseEntity<Portfolio> getMyPortfolio() {
        return ResponseEntity.ok(portfolioService.getMyPortfolio());
    }

    // NEW: The Dashboard Endpoint
    @GetMapping("/dashboard")
    public ResponseEntity<List<Asset>> getDashboard() {
        // 1. Get the current user's portfolio
        Portfolio portfolio = portfolioService.getMyPortfolio();

        // 2. Get all assets in that portfolio
        List<Asset> assets = assetRepository.findByPortfolioId(portfolio.getId());

        // 3. Get all live market prices
        List<MarketItem> marketItems = marketRepository.findAll();

        // 4. Calculate Live Profit/Loss for each asset
        for (Asset asset : assets) {
            // Find the matching live price for this asset
            double currentPrice = marketItems.stream()
                    .filter(m -> m.getSymbol().equals(asset.getSymbol()))
                    .findFirst()
                    .map(MarketItem::getCurrentPrice)
                    .orElse(asset.getAvgBuyPrice()); // Fallback if price missing

            // Set the transient fields (not saved to DB, just sent to Frontend)
            asset.setCurrentMarketPrice(currentPrice);

            double profit = (currentPrice - asset.getAvgBuyPrice()) * asset.getQuantity();
            asset.setProfitLoss(Math.round(profit * 100.0) / 100.0); // Round to 2 decimals
        }

        return ResponseEntity.ok(assets);
    }
}