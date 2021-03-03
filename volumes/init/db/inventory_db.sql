-- Adminer 4.8.0 MySQL 8.0.23 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

USE `inventory_db`;

DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` text,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `image` (`id`, `url`, `product_id`) VALUES
(1,	'https://www.rueducommerce.fr/medias/8494a96a803f3b3996d2ded7075aef06/p_1000x1000/3417761555552.jpg',	1),
(2,	'https://images-na.ssl-images-amazon.com/images/I/81UXsOC8UeL._AC_SX569_.jpg',	1),
(3,	'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/201910/31/00197631306301____7__640x640.jpg',	1),
(4,	'https://i.ebayimg.com/images/g/V4IAAOSw1Ahbtfss/s-l1600.jpg',	2),
(5,	'https://i.ebayimg.com/images/g/EpgAAOSwBlxcohGY/s-l1600.jpg',	2),
(6,	'https://images-na.ssl-images-amazon.com/images/I/81ZETy0yIxL._AC_SL1500_.jpg',	3),
(7,	'https://media.ldlc.com/r1600/ld/products/00/05/55/81/LD0005558162_2.jpg	',	3),
(8,	'https://d3fa68hw0m2vcc.cloudfront.net/1b3/233884352.jpeg',	3);

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `description` text,
  `price` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `product` (`id`, `name`, `description`, `price`, `stock`) VALUES
(1,	'ordi',	'asus',	600,	60),
(2,	'iphone',	'iphone 12 pro',	1500,	100),
(3,	'chaise',	'gamer',	150,	50),
(4,	'pc',	'blabla',	1000,	194);

-- 2021-03-01 10:42:04
