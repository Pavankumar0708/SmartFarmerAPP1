DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS loan_applications;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    mobile VARCHAR(20) NOT NULL UNIQUE,
    aadhaar VARCHAR(20) NOT NULL UNIQUE,
    village VARCHAR(120) NOT NULL,
    land_size DOUBLE NOT NULL,
    crop VARCHAR(80) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    otp_code VARCHAR(12),
    otp_expires_at DATETIME,
    created_at DATETIME NOT NULL
);

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    category VARCHAR(80) NOT NULL,
    price DOUBLE NOT NULL,
    stock INT NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE loan_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    applicant_name VARCHAR(120) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    bank_name VARCHAR(80) NOT NULL,
    amount DOUBLE NOT NULL,
    purpose VARCHAR(160) NOT NULL,
    status VARCHAR(40) NOT NULL
);

CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_name VARCHAR(120) NOT NULL,
    quantity INT NOT NULL,
    total_amount DOUBLE NOT NULL,
    status VARCHAR(40) NOT NULL,
    created_at DATETIME NOT NULL
);
