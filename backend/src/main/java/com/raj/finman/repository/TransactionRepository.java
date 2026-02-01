package com.raj.finman.repository;

import com.raj.finman.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // This allows us to fetch all history for a specific user
    List<Transaction> findByUserId(Long userId);
}