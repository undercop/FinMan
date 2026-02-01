package com.raj.finman;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FinmanApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinmanApplication.class, args);
    }

}
