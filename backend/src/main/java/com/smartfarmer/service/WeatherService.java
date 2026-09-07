package com.smartfarmer.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String lat;
    private final String lon;
    private final String units;
    private final String timeZone;

    public WeatherService(RestTemplateBuilder builder,
                          @Value("${weather.api.key}") String apiKey,
                          @Value("${weather.api.lat:26.9124}") String lat,
                          @Value("${weather.api.lon:75.7873}") String lon,
                          @Value("${weather.api.units:metric}") String units,
                          @Value("${weather.api.timezone:Asia/Kolkata}") String timeZone) {
        this.restTemplate = builder.build();
        this.apiKey = apiKey;
        this.lat = lat;
        this.lon = lon;
        this.units = units;
        this.timeZone = timeZone;
    }

    public Map<String, Object> fetchLiveWeather() {
        try {
            String url = String.format(
                    "https://api.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&exclude=minutely,alerts&units=%s&appid=%s",
                    lat, lon, units, apiKey);

            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response == null || !response.containsKey("current") || !response.containsKey("daily")) {
                return createFallbackWeather();
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> current = (Map<String, Object>) response.get("current");
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> daily = (List<Map<String, Object>>) response.get("daily");

            String description = "Clear skies";
            String mainLabel = "Clear";
            List<Map<String, Object>> weatherList = castList(current.get("weather"));
            if (!weatherList.isEmpty()) {
                @SuppressWarnings("unchecked")
                Map<String, Object> weather = weatherList.get(0);
                description = String.valueOf(weather.getOrDefault("description", description));
                mainLabel = String.valueOf(weather.getOrDefault("main", mainLabel));
            }

            Number tempValue = (Number) current.getOrDefault("temp", 0);
            int temp = (int) Math.round(tempValue.doubleValue());
            int humidity = ((Number) current.getOrDefault("humidity", 0)).intValue();
            double windSpeed = ((Number) current.getOrDefault("wind_speed", 0)).doubleValue();

            String rainChance = "—";
            if (!daily.isEmpty()) {
                Number pop = (Number) daily.get(0).getOrDefault("pop", 0);
                rainChance = String.format("%d%%", (int) Math.round(pop.doubleValue() * 100));
            }

            List<Map<String, Object>> forecast = mapDailyForecast(daily);
            String alertMessage = "No severe weather alerts at this time.";
            if (response.containsKey("alerts")) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> alerts = (List<Map<String, Object>>) response.get("alerts");
                if (!alerts.isEmpty()) {
                    alertMessage = String.valueOf(alerts.get(0).getOrDefault("event", alertMessage)) + ": "
                            + String.valueOf(alerts.get(0).getOrDefault("description", "Check local conditions."));
                }
            }

            return Map.of(
                    "location", "Green Valley",
                    "temperature", String.valueOf(temp),
                    "description", capitalize(description),
                    "humidity", String.valueOf(humidity),
                    "rainChance", rainChance,
                    "windSpeed", String.valueOf((int) Math.round(windSpeed)),
                    "forecast", forecast,
                    "alert", alertMessage,
                    "recommendation", createRecommendation(rainChance, mainLabel)
            );
        } catch (Exception ex) {
            return createFallbackWeather();
        }
    }

    private Map<String, Object> createFallbackWeather() {
        return Map.of(
                "location", "Green Valley",
                "temperature", "31",
                "description", "Sunny with scattered clouds",
                "humidity", "68",
                "rainChance", "32%",
                "windSpeed", "14",
                "forecast", List.of(
                        Map.of("day", "Mon", "icon", "☀️", "label", "Sunny", "temp", "29°C", "rain", "10%", "description", "Warm and dry"),
                        Map.of("day", "Tue", "icon", "🌤️", "label", "Mild", "temp", "30°C", "rain", "20%", "description", "Partly cloudy"),
                        Map.of("day", "Wed", "icon", "⛅", "label", "Breezy", "temp", "28°C", "rain", "45%", "description", "Showers expected"),
                        Map.of("day", "Thu", "icon", "🌧️", "label", "Wet", "temp", "31°C", "rain", "55%", "description", "Rain likely"),
                        Map.of("day", "Fri", "icon", "☀️", "label", "Clear", "temp", "33°C", "rain", "15%", "description", "Sunny and hot")
                ),
                "alert", "No severe weather alerts at this time.",
                "recommendation", "Use drip irrigation and protect young seedlings from midday heat."
        );
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> castList(Object object) {
        if (object instanceof List) {
            return (List<Map<String, Object>>) object;
        }
        return List.of();
    }

    private List<Map<String, Object>> mapDailyForecast(List<Map<String, Object>> daily) {
        List<Map<String, Object>> forecast = new ArrayList<>();
        for (int i = 0; i < Math.min(daily.size(), 7); i++) {
            Map<String, Object> dayData = daily.get(i);
            Number dtValue = (Number) dayData.getOrDefault("dt", 0);
            String day = Instant.ofEpochSecond(dtValue.longValue())
                    .atZone(ZoneId.of(timeZone))
                    .getDayOfWeek()
                    .getDisplayName(TextStyle.SHORT, Locale.ENGLISH);

            @SuppressWarnings("unchecked")
            Map<String, Object> tempData = (Map<String, Object>) dayData.getOrDefault("temp", Map.of());
            Number maxTemp = (Number) tempData.getOrDefault("max", 0);
            String temp = String.format("%d°C", (int) Math.round(maxTemp.doubleValue()));

            String description = "Forecast unavailable";
            String label = "Clear";
            String icon = "☀️";
            List<Map<String, Object>> weatherList = castList(dayData.get("weather"));
            if (!weatherList.isEmpty()) {
                @SuppressWarnings("unchecked")
                Map<String, Object> weather = weatherList.get(0);
                description = String.valueOf(weather.getOrDefault("description", description));
                label = String.valueOf(weather.getOrDefault("main", label));
                icon = emojiForWeather(label);
            }

            Number pop = (Number) dayData.getOrDefault("pop", 0);
            String rain = String.format("%d%%", (int) Math.round(pop.doubleValue() * 100));

            forecast.add(Map.of(
                    "day", day,
                    "icon", icon,
                    "label", label,
                    "temp", temp,
                    "rain", rain,
                    "description", capitalize(description)
            ));
        }
        return forecast;
    }

    private String emojiForWeather(String label) {
        return switch (label.toLowerCase(Locale.ENGLISH)) {
            case "rain", "drizzle", "thunderstorm" -> "🌧️";
            case "snow" -> "❄️";
            case "clouds" -> "⛅";
            case "clear" -> "☀️";
            case "mist", "fog", "haze" -> "🌫️";
            default -> "🌤️";
        };
    }

    private String createRecommendation(String rainChance, String mainLabel) {
        if (rainChance.endsWith("%")) {
            try {
                int value = Integer.parseInt(rainChance.replace("%", ""));
                if (value >= 50) {
                    return "Rain is likely later in the week — cover crops and delay non-essential field trips.";
                }
            } catch (NumberFormatException ignored) {
            }
        }
        return mainLabel.equalsIgnoreCase("Clear")
                ? "The weather looks stable — irrigate early and shield tender plants from midday heat."
                : "Monitor changing skies and keep drainage ready for evening showers.";
    }

    private String capitalize(String text) {
        if (text == null || text.isBlank()) {
            return text;
        }
        return Character.toUpperCase(text.charAt(0)) + text.substring(1);
    }
}
