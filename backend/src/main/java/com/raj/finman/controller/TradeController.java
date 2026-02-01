package com.raj.finman.controller;

import com.raj.finman.model.Transaction;
import com.raj.finman.model.TransactionType;
import com.raj.finman.service.TradeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/trade")
public class TradeController {

    private final TradeService tradeService;

    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    // Endpoint to Buy or Sell: POST /api/v1/trade/execute
    @PostMapping("/execute")
    public ResponseEntity<Transaction> executeTrade(@RequestBody Map<String, Object> request) {
        String symbol = (String) request.get("symbol");
        Double quantity = Double.valueOf(request.get("quantity").toString());
        TransactionType type = TransactionType.valueOf(request.get("type").toString().toUpperCase());

        return ResponseEntity.ok(tradeService.executeTrade(symbol, quantity, type));
    }

    // Endpoint to see history: GET /api/v1/trade/history
    @GetMapping("/history")
    public ResponseEntity<List<Transaction>> getMyHistory() {
        // We will add this method to the service in the next step
        return ResponseEntity.ok(tradeService.getUserHistory());
    }
}