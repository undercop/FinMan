package com.raj.finman.config;

import com.raj.finman.model.AssetCategory;
import com.raj.finman.model.MarketItem;
import com.raj.finman.repository.MarketItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final MarketItemRepository repository;

    public DataInitializer(MarketItemRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            repository.saveAll(Arrays.asList(
                    createItem("AAPL", "Apple Inc.", 185.20, AssetCategory.STOCKS),
                    createItem("NVDA", "Nvidia", 820.30, AssetCategory.STOCKS),
                    createItem("GOOGL", "Alphabet Inc.", 140.50, AssetCategory.STOCKS), // Add this
                    createItem("TSLA", "Tesla Inc.", 175.00, AssetCategory.STOCKS),   // Add this
                    createItem("MSFT", "Microsoft", 410.00, AssetCategory.STOCKS),    // Add this
                    createItem("GOLD", "Gold Bullion (oz)", 2150.00, AssetCategory.METALS),
                    createItem("SLVR", "Silver (oz)", 24.50, AssetCategory.METALS),
                    createItem("T-BOND", "US 10Y Treasury", 100.00, AssetCategory.BONDS)
            ));
            System.out.println(">> Market Data Seeded Successfully.");
        }
    }

    private MarketItem createItem(String symbol, String name, double price, AssetCategory cat) {
        MarketItem item = new MarketItem();
        item.setSymbol(symbol);
        item.setName(name);
        item.setCurrentPrice(price);
        item.setOpeningPrice(price);
        item.setCategory(cat);
        return item;
    }
}