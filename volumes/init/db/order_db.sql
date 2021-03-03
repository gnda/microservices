-- Adminer 4.8.0 MySQL 8.0.23 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

USE `order_db`;

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `products` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `order` (`id`, `idUser`, `amount`, `createdAt`, `products`) VALUES
(1,	3,	15000,	'2021-02-09 15:35:05',	'[{\"id\": \"1\", \"amount\": \"12000\", \"quantity\": \"20\"}, {\"id\": \"4\", \"amount\": \"3000\", \"quantity\": \"3\"}]'),
(2,	3,	15000,	'2021-02-09 16:09:31',	'[{\"id\": \"1\", \"amount\": \"12000\", \"quantity\": \"20\"}, {\"id\": \"4\", \"amount\": \"3000\", \"quantity\": \"3\"}]');

-- 2021-03-03 13:30:57
