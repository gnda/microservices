-- Adminer 4.8.0 MySQL 8.0.23 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

USE `authentication_db`;

DROP TABLE IF EXISTS `revoked_tokens`;
CREATE TABLE `revoked_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jti` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `users_chk_1` CHECK ((`isAdmin` in (0,1)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `username`, `password`, `email`, `isAdmin`, `address`) VALUES
(1,	'user',	'$pbkdf2-sha256$29000$3ntPqbWWMsb4H0PIeQ8BoA$C9pM9yD.xhnEn4VrEBIxY8MEyBPOL/hPc5PwIRMfgRY',	'test@test.com',	0,	'14 boulevard de Paris, 13055 Marseille'),
(2,	'admin',	'$pbkdf2-sha256$29000$CCEEAEAIwdh77917L8UYAw$1oa9xfvcldCj4iItYc.t0zbPdBcmDzA6Vh.DF/7V9k0',	'admin@test.com',	1,	'9 avenue de l\'entreprise, 95800 Cergy, FRANCE');

-- 2021-03-03 13:29:34
