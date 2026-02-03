-- Hack Whack 3.0 Database Schema
-- Run this SQL in your MySQL database to set up the required tables

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS hackwhack;
USE hackwhack;

-- Teams table for storing registered teams
CREATE TABLE IF NOT EXISTS teams (
  team_id INT AUTO_INCREMENT PRIMARY KEY,
  team_name VARCHAR(255) NOT NULL,
  leader_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  college VARCHAR(255) NOT NULL,
  members JSON DEFAULT NULL,
  qr_value VARCHAR(255) UNIQUE,
  checked_in BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_qr_value (qr_value),
  INDEX idx_checked_in (checked_in)
);

-- Admins table for storing admin accounts
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_admin_email (email)
);

-- Example queries for reference:

-- Get all registered teams
-- SELECT * FROM teams ORDER BY created_at DESC;

-- Get team stats
-- SELECT 
--   COUNT(*) as total_teams,
--   SUM(CASE WHEN checked_in = TRUE THEN 1 ELSE 0 END) as checked_in_teams
-- FROM teams;

-- Check in a team by QR value
-- UPDATE teams SET checked_in = TRUE WHERE qr_value = 'HACKWHACK-xxxxx';
