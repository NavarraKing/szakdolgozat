CREATE DATABASE ims CHARACTER SET utf8 COLLATE utf8mb4_hungarian_ci;
USE ims;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    number_countrycode VARCHAR(6),
    phone_number VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    given_name VARCHAR(100),
    family_name VARCHAR(100),
    dob VARCHAR(10),
    address VARCHAR(255),
    profile_picture TEXT DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106',
    account_level TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE users_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    modified TEXT NOT NULL,
    modified_by INT NOT NULL,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (modified_by) REFERENCES users(id)
);
CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY,
    rolename VARCHAR(100) NOT NULL
);
CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    itemname VARCHAR(255) NOT NULL, 
    displayname VARCHAR(255) NOT NULL, 
    price INT NOT NULL, 
    stock INT DEFAULT 0, 
    description TEXT DEFAULT NULL, 
    image_url TEXT DEFAULT 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 
    created_by INT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    FOREIGN KEY (created_by) REFERENCES users(id)
);
CREATE TABLE products_logs(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    modified TEXT NOT NULL,
    modified_by INT NOT NULL,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (modified_by) REFERENCES users(id)
);
CREATE TABLE receipts(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    items TEXT NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    total_price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id)
)