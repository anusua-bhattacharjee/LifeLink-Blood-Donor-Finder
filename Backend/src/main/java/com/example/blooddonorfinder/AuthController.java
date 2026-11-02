package com.example.blooddonorfinder;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @GetMapping("/login")
    public Map<String, String> login(Authentication authentication) {

        if (authentication == null ||
                !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthorized");
        }

        return Map.of(
            "message", "Login successful",
            "username", authentication.getName()
        );
    }
}
