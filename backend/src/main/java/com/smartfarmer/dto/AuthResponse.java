package com.smartfarmer.dto;

public class AuthResponse {
    private Long id;
    private String name;
    private String mobile;
    private String village;
    private String crop;
    private String token;

    public AuthResponse() {}

    public AuthResponse(Long id, String name, String mobile, String village, String crop, String token) {
        this.id = id;
        this.name = name;
        this.mobile = mobile;
        this.village = village;
        this.crop = crop;
        this.token = token;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}