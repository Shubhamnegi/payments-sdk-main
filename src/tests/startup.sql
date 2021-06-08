-- Replace database name 
CREATE DATABASE IF NOT EXISTS payserv_sdk_test; 
USE payserv_sdk_test;
DROP TABLE IF EXISTS plans;
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
