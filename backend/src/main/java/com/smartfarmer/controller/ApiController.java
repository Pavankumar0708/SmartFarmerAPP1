package com.smartfarmer.controller;

import com.smartfarmer.dto.AuthResponse;
import com.smartfarmer.dto.LoginRequest;
import com.smartfarmer.dto.OtpRequest;
import com.smartfarmer.dto.OtpVerificationRequest;
import com.smartfarmer.dto.RegisterRequest;
import com.smartfarmer.model.LoanApplication;
import com.smartfarmer.model.Product;
import com.smartfarmer.repository.LoanApplicationRepository;
import com.smartfarmer.repository.ProductRepository;
import com.smartfarmer.repository.UserRepository;
import com.smartfarmer.service.AuthService;
import com.smartfarmer.service.WeatherService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final AuthService authService;
    private final ProductRepository productRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final UserRepository userRepository;
    private final WeatherService weatherService;

    public ApiController(AuthService authService,
                         ProductRepository productRepository,
                         LoanApplicationRepository loanApplicationRepository,
                         UserRepository userRepository,
                         WeatherService weatherService) {
        this.authService = authService;
        this.productRepository = productRepository;
        this.loanApplicationRepository = loanApplicationRepository;
        this.userRepository = userRepository;
        this.weatherService = weatherService;
    }

    @PostMapping("/auth/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/auth/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/auth/request-otp")
    public Map<String, String> requestOtp(@RequestBody OtpRequest request) {
        String otp = authService.requestOtp(request.getMobile());
        return Map.of("mobile", request.getMobile(), "otp", otp);
    }

    @PostMapping("/auth/verify-otp")
    public Map<String, Object> verifyOtp(@RequestBody OtpVerificationRequest request) {
        boolean valid = authService.verifyOtp(request.getMobile(), request.getOtp());
        return Map.of("mobile", request.getMobile(), "verified", valid);
    }

    @GetMapping("/weather")
    public Map<String, Object> weather() {
        return weatherService.fetchLiveWeather();
    }

    @GetMapping("/market")
    public Map<String, Object> market() {
        return Map.of(
                "prices", Map.of(
                        "Tomato", "₹120/kg",
                        "Wheat", "₹95/kg",
                        "Rice", "₹108/kg"
                ),
                "nearby", List.of(
                        "Village mandi: +5% today",
                        "Town market: Stable",
                        "Wholesale center: +3% today"
                ),
                "trends", List.of(
                        Map.of("day", "Mon", "height", "40%"),
                        Map.of("day", "Tue", "height", "55%"),
                        Map.of("day", "Wed", "height", "75%"),
                        Map.of("day", "Thu", "height", "68%"),
                        Map.of("day", "Fri", "height", "82%")
                )
        );
    }

    @PostMapping("/apply-loan")
    public Map<String, Object> applyLoan(@RequestBody LoanApplication loanApplication) {
        loanApplication.setStatus("Pending");
        LoanApplication saved = loanApplicationRepository.save(loanApplication);
        return Map.of("id", saved.getId(), "status", saved.getStatus());
    }

    @PutMapping("/profile/{mobile}")
    public Map<String, Object> updateProfile(@PathVariable String mobile, @RequestBody Map<String, Object> updates) {
        return userRepository.findByMobile(mobile)
                .map(user -> {
                    if (updates.containsKey("village")) {
                        user.setVillage((String) updates.get("village"));
                    }
                    if (updates.containsKey("landSize")) {
                        user.setLandSize(((Number) updates.get("landSize")).doubleValue());
                    }
                    if (updates.containsKey("crop")) {
                        user.setCrop((String) updates.get("crop"));
                    }
                    userRepository.save(user);
                    Map<String, Object> response = new HashMap<>();
                    response.put("name", user.getName());
                    response.put("mobile", user.getMobile());
                    response.put("village", user.getVillage());
                    response.put("landSize", user.getLandSize());
                    response.put("crop", user.getCrop());
                    return response;
                })
                .orElseGet(() -> Map.of("message", "Farmer profile not found"));
    }

    @GetMapping("/schemes")
    public List<Map<String, String>> schemes() {
        return List.of(
                Map.of("name", "PM-KISAN", "details", "Direct income support for eligible farmers"),
                Map.of("name", "Soil Health Card", "details", "Soil testing and nutrient recommendations"),
                Map.of("name", "Crop Insurance", "details", "Protection against weather and yield losses")
        );
    }

    @GetMapping("/loan-eligibility")
    public Map<String, Object> loanEligibility() {
        return Map.of("score", 78, "status", "Eligible", "bank", "SBI");
    }

    @GetMapping("/store")
    public List<Product> store() {
        return productRepository.findAll();
    }

    @GetMapping("/loans")
    public List<LoanApplication> loans() {
        return loanApplicationRepository.findAll();
    }

    @GetMapping("/profile/{mobile}")
    public Map<String, Object> profile(@PathVariable String mobile) {
        return userRepository.findByMobile(mobile)
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("name", user.getName());
                    response.put("mobile", user.getMobile());
                    response.put("village", user.getVillage());
                    response.put("landSize", user.getLandSize());
                    response.put("crop", user.getCrop());
                    return response;
                })
                .orElseGet(() -> Map.of("message", "Farmer profile not found"));
    }

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        return Map.of(
                "welcome", "Welcome back, Smart Farmer",
                "weather", "Sunny with mild winds",
                "market", "Tomato prices are trending upward",
                "advisor", "Tomato is the best fit for current conditions"
        );
    }

    @GetMapping("/community")
    public List<Map<String, String>> community() {
        return List.of(
                Map.of("title", "Best irrigation practices", "likes", "126"),
                Map.of("title", "Harvest season checklist", "likes", "98")
        );
    }
}