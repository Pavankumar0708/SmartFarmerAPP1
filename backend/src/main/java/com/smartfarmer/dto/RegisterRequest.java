package com.smartfarmer.dto;

public class RegisterRequest {
    private String name;
    private String mobile;
    private String aadhaar;
    private String village;
    private Double landSize;
    private String crop;
    private String password;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getAadhaar() { return aadhaar; }
    public void setAadhaar(String aadhaar) { this.aadhaar = aadhaar; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public Double getLandSize() { return landSize; }
    public void setLandSize(Double landSize) { this.landSize = landSize; }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}