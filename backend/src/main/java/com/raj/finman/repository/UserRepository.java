package com.raj.finman.repository;

import com.raj.finman.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    // Spring Data JPA creates all the basic CRUD methods for you!
}
