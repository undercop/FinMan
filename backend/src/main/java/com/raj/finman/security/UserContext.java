package com.raj.finman.security;

public class UserContext {
    private static final ThreadLocal<Long> currentUser = new ThreadLocal<>();

    public static void setCurrentUserId(Long userId) { currentUser.set(userId); }
    public static Long getCurrentUserId() { return currentUser.get(); }
    public static void clear() { currentUser.remove(); }
}