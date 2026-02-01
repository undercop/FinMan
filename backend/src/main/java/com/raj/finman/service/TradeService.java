package com.raj.finman.service;

import com.raj.finman.model.*;
import com.raj.finman.repository.*;
import com.raj.finman.security.UserContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class TradeService {

    private final TransactionRepository transactionRepository;
    private final MarketItemRepository marketRepository;
    private final UserRepository userRepository; // Changed from UserService to UserRepository
    private final AssetRepository assetRepository;
    private final PortfolioService portfolioService;

    public TradeService(TransactionRepository transactionRepository,
                        MarketItemRepository marketRepository,
                        UserRepository userRepository,
                        AssetRepository assetRepository,
                        PortfolioService portfolioService) {
        this.transactionRepository = transactionRepository;
        this.marketRepository = marketRepository;
        this.userRepository = userRepository;
        this.assetRepository = assetRepository;
        this.portfolioService = portfolioService;
    }

    @Transactional
    public Transaction executeTrade(String symbol, Double quantity, TransactionType type) {
        // 1. Validation & Setup
        Long userId = UserContext.getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MarketItem marketItem = marketRepository.findAll().stream()
                .filter(item -> item.getSymbol().equals(symbol))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Asset not found in market"));

        double price = marketItem.getCurrentPrice();
        double totalCost = price * quantity;

        Portfolio portfolio = portfolioService.getMyPortfolio();

        // 2. LOGIC: Wallet & Balance Check
        if (type == TransactionType.BUY) {
            // Check if user has enough money
            if (user.getBalance() < totalCost) {
                throw new RuntimeException("Insufficient Funds! You have $" + user.getBalance() + " but need $" + totalCost);
            }
            // Deduct money
            user.setBalance(user.getBalance() - totalCost);
        }
        else if (type == TransactionType.SELL) {
            // Add money (We will validate if they own the stock below)
            user.setBalance(user.getBalance() + totalCost);
        }

        // 3. LOGIC: Update the Asset Table (The "Bag")
        Asset asset = assetRepository.findByPortfolioIdAndSymbol(portfolio.getId(), symbol)
                .orElse(null);

        if (asset == null) {
            // Case A: First time buying this stock
            if (type == TransactionType.SELL) {
                throw new RuntimeException("Cannot sell stock you don't own!");
            }
            asset = new Asset();
            asset.setPortfolio(portfolio);
            asset.setSymbol(symbol);
            asset.setName(marketItem.getName());
            asset.setQuantity(0.0);
            asset.setAvgBuyPrice(0.0);
        }

        if (type == TransactionType.BUY) {
            // Weighted Average Calculation
            double totalValue = (asset.getQuantity() * asset.getAvgBuyPrice()) + totalCost;
            double newQuantity = asset.getQuantity() + quantity;

            asset.setQuantity(newQuantity);
            asset.setAvgBuyPrice(totalValue / newQuantity);

        } else if (type == TransactionType.SELL) {
            // Validation: Do they actually have enough shares?
            if (asset.getQuantity() < quantity) {
                throw new RuntimeException("Not enough shares to sell! You only have " + asset.getQuantity());
            }
            asset.setQuantity(asset.getQuantity() - quantity);
        }

        // 4. Saving Everything
        userRepository.save(user); // Save the new wallet balance!

        if (asset.getQuantity() == 0) {
            assetRepository.delete(asset);
        } else {
            assetRepository.save(asset);
        }

        // 5. Create the Transaction Record (History)
        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setSymbol(symbol);
        tx.setQuantity(quantity);
        tx.setPriceAtTransaction(price);
        tx.setTimestamp(java.time.LocalDateTime.now());
        tx.setType(type);

        return transactionRepository.save(tx);
    }

    public List<Transaction> getUserHistory() {
        Long userId = UserContext.getCurrentUserId();
        return transactionRepository.findByUserId(userId);
    }
}