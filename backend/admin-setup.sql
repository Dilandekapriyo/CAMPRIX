-- Add role column if it doesn't exist
ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';

-- Create an admin user (email: admin@example.com, password: admin123)
-- Use bcrypt hash: $2b$10$C9E.yd6PvdQHbLqCPPfAW.45CvSyPb5E8F9pZ.y0YxP9d4L4R2oWW
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@example.com', '$2b$10$C9E.yd6PvdQHbLqCPPfAW.45CvSyPb5E8F9pZ.y0YxP9d4L4R2oWW', 'admin')
ON DUPLICATE KEY UPDATE role='admin';
