-- CareWay Database Schema
-- MySQL 8.0

CREATE DATABASE IF NOT EXISTS careway;
USE careway;

-- Table des utilisateurs
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'coordinateur', 'chauffeur', 'ambulancier') NOT NULL,
    phone VARCHAR(20),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des employés
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    activityRate DECIMAL(5,2) DEFAULT 0,
    absenceDays INT DEFAULT 0,
    status ENUM('Disponible', 'En trajet', 'Indisponible') DEFAULT 'Disponible',
    email VARCHAR(255),
    phone VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des véhicules
CREATE TABLE vehicles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    registration VARCHAR(20) UNIQUE NOT NULL,
    type ENUM('Ambulance', 'VSL', 'VSAB') NOT NULL,
    mileage INT DEFAULT 0,
    nextMaintenance DATE,
    status ENUM('Disponible', 'En service', 'Maintenance', 'Indisponible') DEFAULT 'Disponible',
    model VARCHAR(100),
    year INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des contrats
CREATE TABLE contracts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    partnerName VARCHAR(255) NOT NULL,
    type ENUM('Public', 'Privé') NOT NULL,
    status ENUM('En cours', 'Expiré', 'Suspendu') DEFAULT 'En cours',
    startDate DATE,
    endDate DATE,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des patients
CREATE TABLE patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    dateOfBirth DATE,
    phone VARCHAR(20),
    address TEXT,
    medicalInfo TEXT,
    emergencyContact VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des trajets
CREATE TABLE trips (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patientId INT,
    employeeId INT,
    vehicleId INT,
    startLocation TEXT NOT NULL,
    endLocation TEXT NOT NULL,
    scheduledDate DATETIME NOT NULL,
    actualStartTime DATETIME,
    actualEndTime DATETIME,
    status ENUM('Planifié', 'En cours', 'Terminé', 'Annulé') DEFAULT 'Planifié',
    distance DECIMAL(8,2),
    duration INT, -- en minutes
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id),
    FOREIGN KEY (employeeId) REFERENCES employees(id),
    FOREIGN KEY (vehicleId) REFERENCES vehicles(id)
);

-- Table des transactions
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tripId INT,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('En attente', 'Validée', 'Facturée', 'Payée') DEFAULT 'En attente',
    paymentMethod VARCHAR(50),
    invoiceNumber VARCHAR(100),
    paidAt DATETIME,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tripId) REFERENCES trips(id)
);

-- Table des demandes de transport
CREATE TABLE transport_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patientId INT,
    requestedDate DATETIME NOT NULL,
    pickupLocation TEXT NOT NULL,
    destination TEXT NOT NULL,
    urgency ENUM('Normal', 'Urgent', 'Critique') DEFAULT 'Normal',
    status ENUM('Nouvelle', 'En cours', 'Acceptée', 'Refusée', 'Terminée') DEFAULT 'Nouvelle',
    notes TEXT,
    assignedTripId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id),
    FOREIGN KEY (assignedTripId) REFERENCES trips(id)
);

-- Insertion de données de test
INSERT INTO employees (firstName, lastName, role, activityRate, absenceDays, status) VALUES
('Loic', 'Dupont', 'Ambulancier', 90.00, 2, 'Disponible'),
('Pierre', 'Bois', 'Chauffeur', 95.00, 1, 'En trajet');

INSERT INTO vehicles (registration, type, mileage, nextMaintenance, status) VALUES
('AB-133-BC', 'Ambulance', 45000, '2025-08-26', 'Disponible'),
('ZV-887-FV', 'VSL', 120050, '2027-02-18', 'Disponible');

INSERT INTO contracts (partnerName, type, status) VALUES
('CPAM Tarn', 'Public', 'En cours'),
('Ct. du Sidobre', 'Privé', 'En cours');

INSERT INTO patients (firstName, lastName, dateOfBirth, phone, address) VALUES
('Marie', 'Dupont', '1945-03-15', '05.63.12.34.56', '123 Rue de la Paix, 81000 Albi'),
('Jean', 'Martin', '1938-07-22', '05.63.98.76.54', '456 Avenue du Général, 81100 Castres'),
('Sophie', 'Bernard', '1952-11-08', '05.63.45.67.89', '789 Boulevard Victor Hugo, 81200 Mazamet');