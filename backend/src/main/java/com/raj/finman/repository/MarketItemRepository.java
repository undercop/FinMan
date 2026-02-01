package com.raj.finman.repository;

import com.raj.finman.model.MarketItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarketItemRepository extends JpaRepository<MarketItem, Long> {
    // Basic CRUD is enough for now
}