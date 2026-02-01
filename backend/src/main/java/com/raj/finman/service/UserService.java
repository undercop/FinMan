package com.raj.finman.service;

import com.raj.finman.model.Portfolio;
import com.raj.finman.model.User;
import com.raj.finman.repository.PortfolioRepository;
import com.raj.finman.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository; // <--- New Dependency

    public UserService(UserRepository userRepository, PortfolioRepository portfolioRepository) {
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
    }

    @Transactional // Ensures User and Portfolio are created together or not at all
    public User createUser(User user) {
        // 1. Setup the User with Free Money
        if (user.getBalance() == null) {
            user.setBalance(10000.00);
        }

        // 2. Save the User first (so we get the generated ID)
        User savedUser = userRepository.save(user);

        // 3. Automatically create the Portfolio
        Portfolio portfolio = new Portfolio();
        portfolio.setName(savedUser.getName() + "'s Portfolio"); // e.g., "Raj's Portfolio"
        portfolio.setUser(savedUser);

        portfolioRepository.save(portfolio); // <--- Saved to DB

        return savedUser;
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}