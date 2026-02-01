package com.raj.finman.repository;

import com.raj.finman.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    // We now look for a single object, not a list
    Optional<Portfolio> findByUserId(Long userId);
}