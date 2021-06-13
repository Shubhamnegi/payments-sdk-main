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


CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` INTEGER auto_increment , 
  `name` VARCHAR(255) NOT NULL, 
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `status` ENUM('active', 'suspended') DEFAULT 'active',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;