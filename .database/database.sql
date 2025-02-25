-- IMS Database creation script
-- MariaDB (11.5.2)
CREATE DATABASE ims CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE ims;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    given_name VARCHAR(100),
    family_name VARCHAR(100),
    dob DATE,
    address VARCHAR(255),
    account_level TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO users (id, username, email, phone_number, password, given_name, family_name, dob, address, account_level, created_at, last_modified) VALUES
(1, 'Navarra', 'tothtamas927@gmail.com', '06701231234', 'NavarraPass123', 'Tamás', 'Tóth', '2001-01-01', '1234 ExampleCity, Example Adress 6', 0, '2024-10-09 21:45:29', '2024-10-09 23:45:54');