package com.raj.finman.service;

import com.raj.finman.model.MarketItem;
import com.raj.finman.repository.MarketItemRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MarketSimulatorService {

    private final MarketItemRepository repository;

    public MarketSimulatorService(MarketItemRepository repository) {
        this.repository = repository;
    }

    // Runs every 5 seconds to simulate market volatility
    @Scheduled(fixedRate = 10000)
    public void simulatePrices() {
        List<MarketItem> items = repository.findAll();
        for (MarketItem item : items) {
            // Random change between -0.3% and +0.3%
            double change = (Math.random() * 0.006) - 0.003;
            double newPrice = item.getCurrentPrice() * (1 + change);

            // Round to 2 decimals
            item.setCurrentPrice(Math.round(newPrice * 100.0) / 100.0);
        }
        repository.saveAll(items);
    }
}