package com.smartfarmer.service;

import com.smartfarmer.dto.AuthResponse;
import com.smartfarmer.dto.LoginRequest;
import com.smartfarmer.dto.RegisterRequest;
import com.smartfarmer.model.User;
import com.smartfarmer.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Random random = new Random();

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        validateRegisterRequest(request);

        if (userRepository.existsByMobile(request.getMobile())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mobile number already registered");
        }
        if (userRepository.existsByAadhaar(request.getAadhaar())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aadhaar number already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setMobile(request.getMobile());
        user.setAadhaar(request.getAadhaar());
        user.setVillage(request.getVillage());
        user.setLandSize(request.getLandSize());
        user.setCrop(request.getCrop());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        User saved = userRepository.save(user);
        return buildAuthResponse(saved, createDemoToken(saved.getId()));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByMobile(request.getMobile())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        return buildAuthResponse(user, createDemoToken(user.getId()));
    }

    public String requestOtp(String mobile) {
        User user = userRepository.findByMobile(mobile)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mobile number not found"));

        String otp = String.format("%06d", random.nextInt(999999));
        user.setOtpCode(otp);
        user.setOtpExpiresAt(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);
        return otp;
    }

    public boolean verifyOtp(String mobile, String otp) {
        User user = userRepository.findByMobile(mobile)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mobile number not found"));

        if (user.getOtpCode() == null || user.getOtpExpiresAt() == null) {
            return false;
        }

        boolean valid = user.getOtpCode().equals(otp) && user.getOtpExpiresAt().isAfter(LocalDateTime.now());
        if (valid) {
            user.setOtpCode(null);
            user.setOtpExpiresAt(null);
            userRepository.save(user);
        }
        return valid;
    }

    private void validateRegisterRequest(RegisterRequest request) {
        if (request.getName() == null || request.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name is required");
        }
        if (request.getMobile() == null || !request.getMobile().matches("\\d{10}")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mobile number must be 10 digits");
        }
        if (request.getAadhaar() == null || !request.getAadhaar().matches("\\d{12}")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aadhaar must be 12 digits");
        }
        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters");
        }
    }

    private AuthResponse buildAuthResponse(User user, String token) {
        return new AuthResponse(user.getId(), user.getName(), user.getMobile(), user.getVillage(), user.getCrop(), token);
    }

    private String createDemoToken(Long userId) {
        return "sf-demo-token-" + userId + "-" + System.currentTimeMillis();
    }
}