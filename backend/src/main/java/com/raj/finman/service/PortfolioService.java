package com.raj.finman.service;

import com.raj.finman.model.Portfolio;
import com.raj.finman.model.User;
import com.raj.finman.repository.PortfolioRepository;
import com.raj.finman.security.UserContext;
import org.springframework.stereotype.Service;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserService userService;

    public PortfolioService(PortfolioRepository portfolioRepository, UserService userService) {
        this.portfolioRepository = portfolioRepository;
        this.userService = userService;
    }

    public Portfolio createPortfolio(Portfolio portfolio) {
        Long currentUserId = UserContext.getCurrentUserId();

        // Safety Check: Does this user already have a portfolio?
        if (portfolioRepository.findByUserId(currentUserId).isPresent()) {
            throw new RuntimeException("User already has a portfolio!");
        }

        User currentUser = userService.getUserById(currentUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        portfolio.setUser(currentUser);
        return portfolioRepository.save(portfolio);
    }

    public Portfolio getMyPortfolio() {
        Long currentUserId = UserContext.getCurrentUserId();
        return portfolioRepository.findByUserId(currentUserId)
                .orElseThrow(() -> new RuntimeException("No portfolio found for this user"));
    }
}

