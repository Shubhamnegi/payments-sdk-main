-- Replace database name 
DROP DATABASE payserv_sdk_test;
CREATE DATABASE payserv_sdk_test; 

USE payserv_sdk_test;

-- Table Plan
CREATE TABLE `plans` (
  `planName` varchar(255) NOT NULL,
  `orders` int NOT NULL COMMENT 'Max number of order',
  `businessUnits` int NOT NULL COMMENT 'Max number of bu',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `price` int NOT NULL DEFAULT '0' COMMENT 'Price for plan',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`planName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Table Subscribers
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` INTEGER auto_increment , 
  `name` VARCHAR(255) NOT NULL, 
  `username` VARCHAR(255) NOT NULL UNIQUE, 
  `password` VARCHAR(255) NOT NULL,   
  `status` ENUM('active', 
  'suspended') DEFAULT 'active', 
  `createdAt` DATETIME NOT NULL, 
  `updatedAt` DATETIME NOT NULL, 
  `plan` VARCHAR(255), 
  `planStartDate` DATETIME COMMENT 'Date time when new plan started from', 
  `planExpiryDate` DATETIME COMMENT 'Expiry time when plan stops working', 
  PRIMARY KEY (`id`), 
  FOREIGN KEY (`plan`) REFERENCES `plans` (`planName`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;