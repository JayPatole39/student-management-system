-- ====================================================================
-- Student Management System - Simplified & Professional 2-Table Schema
-- Specially designed for Diploma Project & College Presentation
-- ====================================================================

-- Database is provided by Aiven (defaultdb)

-- --------------------------------------------------------------------
-- Table 1: users (Authentication & Roles: Admin / Student / Faculty)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'faculty', 'student') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- Table 2: students (Complete Consolidated Student Profile & Records)
-- Contains: Personal Info + Academic + Attendance + Marks + Fee Status
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    roll_no VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') DEFAULT 'Male',
    dob DATE,
    department VARCHAR(100) NOT NULL,       -- e.g., 'Computer Engineering'
    semester VARCHAR(20) NOT NULL,         -- e.g., '6th Sem' / '3rd Year'
    attendance_percentage DECIMAL(5,2) DEFAULT 0.00, -- e.g., 85.50
    cgpa_marks DECIMAL(4,2) DEFAULT 0.00,  -- e.g., 8.75 CGPA or %
    fees_total DECIMAL(10,2) DEFAULT 45000.00,
    fees_paid DECIMAL(10,2) DEFAULT 0.00,
    fees_status ENUM('Paid', 'Pending', 'Partial') DEFAULT 'Pending',
    admission_date DATE DEFAULT (CURRENT_DATE),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- --------------------------------------------------------------------
-- Sample Initial Data for Testing & Presentation
-- --------------------------------------------------------------------

-- 1. Default Admin & Student Users (Password: admin123 / student123)
INSERT INTO users (name, email, password, role) VALUES 
('Project Admin', 'admin@sms.com', '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890', 'admin'),
('Rahul Sharma', 'rahul@sms.com', '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890', 'student'),
('Pooja Patil', 'pooja@sms.com', '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890', 'student')
ON DUPLICATE KEY UPDATE id=id;

-- 2. Sample Student Records (With Analytics, Fees & Academic Data)
INSERT INTO students (roll_no, full_name, email, phone, gender, dob, department, semester, attendance_percentage, cgpa_marks, fees_total, fees_paid, fees_status, status) VALUES
('CO301', 'Rahul Sharma', 'rahul@sms.com', '9876543210', 'Male', '2004-05-15', 'Computer Engineering', '6th Sem', 88.50, 8.75, 45000.00, 45000.00, 'Paid', 'Active'),
('CO302', 'Pooja Patil', 'pooja@sms.com', '9876543211', 'Female', '2004-08-22', 'Computer Engineering', '6th Sem', 92.00, 9.20, 45000.00, 30000.00, 'Partial', 'Active'),
('CO303', 'Amit Deshmukh', 'amit@sms.com', '9876543212', 'Male', '2003-12-10', 'Information Technology', '6th Sem', 74.00, 7.80, 45000.00, 0.00, 'Pending', 'Active'),
('CO304', 'Sneha Kulkarni', 'sneha@sms.com', '9876543213', 'Female', '2004-03-18', 'Computer Engineering', '6th Sem', 95.50, 9.50, 45000.00, 45000.00, 'Paid', 'Active'),
('CO305', 'Rohan Shinde', 'rohan@sms.com', '9876543214', 'Male', '2004-07-05', 'Civil Engineering', '6th Sem', 68.00, 6.90, 45000.00, 20000.00, 'Partial', 'Active')
ON DUPLICATE KEY UPDATE id=id;
