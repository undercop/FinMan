package com.raj.finman.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class UserContextFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String userIdHeader = req.getHeader("X-USER-ID");

        if (userIdHeader != null) {
            UserContext.setCurrentUserId(Long.parseLong(userIdHeader));
        }

        try {
            chain.doFilter(request, response);
        } finally {
            UserContext.clear(); // Always clear to prevent memory leaks!
        }
    }
}