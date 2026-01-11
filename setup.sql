-- Database setup for CAMPRIX backend
-- Run this script in your MySQL client to create the database and tables

CREATE DATABASE IF NOT EXISTS camprix;
USE camprix;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO users (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Bob Johnson', 'bob@example.com');

-- Products table
CREATE TABLE IF NOT EXISTS home_product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  unit VARCHAR(100) NOT NULL,
  cat VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO home_product (name, price, unit, cat) VALUES
('Rice (Local)', '850 XAF', 'per kg', 'Food'),
('Gasoline (Premium)', '650 XAF', 'per liter', 'Fuel'),
('Cement (50kg bag)', '4,500 XAF', 'per bag', 'Construction'),
('Cooking Oil', '1,200 XAF', 'per liter', 'Food'),
('Diesel', '620 XAF', 'per liter', 'Fuel'),
('Iron Rods (12mm)', '8,500 XAF', 'per bundle', 'Construction'),
('Bread (Standard)', '200 XAF', 'per loaf', 'Food'),
('Kerosene', '580 XAF', 'per liter', 'Fuel'),
('Paint (Interior)', '3,200 XAF', 'per 4L', 'Construction'),
('Sugar', '750 XAF', 'per kg', 'Food');