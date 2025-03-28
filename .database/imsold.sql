-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2025. Már 24. 23:25
-- Kiszolgáló verziója: 11.5.2-MariaDB
-- PHP verzió: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ims`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemname` varchar(255) NOT NULL,
  `displayname` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `description` text DEFAULT NULL,
  `image_url` text DEFAULT 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `last_modified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `itemname`, `displayname`, `price`, `stock`, `description`, `image_url`, `created_by`, `created_at`, `last_modified`) VALUES
(1, 'test1', 'Test Product 1', 0, 0, 'This is a Test Product.', 'https://mentalfitnessguru.hu/wp-content/uploads/2014/10/water1.jpg', 1, '2025-02-26 11:59:29', '2025-03-23 13:37:53'),
(2, 'test2', 'Test Product 2', 3, 4, 'This is another test product.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cajaqnSJar1KEm6qAR5iyVDJYaywOFks8A&s', 1, '2025-02-26 12:11:22', '2025-03-22 21:48:44'),
(3, 'test3', 'test3', 999999999, 1, 'Test with a long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long description.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-20 15:24:24', '2025-03-22 21:32:20'),
(8, 'kenyer', 'Kenyer', 0, 10, 'Ez egy kenyér', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s', 16, '2025-03-22 22:07:19', '2025-03-22 22:07:31');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products_logs`
--

DROP TABLE IF EXISTS `products_logs`;
CREATE TABLE IF NOT EXISTS `products_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `modified` text NOT NULL,
  `modified_by` int(11) NOT NULL,
  `modified_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `modified_by` (`modified_by`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `products_logs`
--

INSERT INTO `products_logs` (`id`, `product_id`, `modified`, `modified_by`, `modified_at`) VALUES
(1, 1, 'Edited: Price changed, 1001 -> 1000', 15, '2025-03-22 21:20:54'),
(2, 1, 'Edited: Price changed, 1000 -> 1000, Stock changed, 7 -> 10', 15, '2025-03-22 21:21:09'),
(3, 1, 'Edited: Item Name changed, test1 -> test11', 15, '2025-03-22 21:27:07'),
(4, 1, 'Edited: Item Name changed, test11 -> test1', 15, '2025-03-22 21:27:22'),
(5, 1, 'Edited: Price changed, 1000 -> 1001, Stock changed, 10 -> 11', 15, '2025-03-22 21:27:31'),
(6, 1, 'Edited: Price changed, 1001 -> 1000, Stock changed, 11 -> 11', 15, '2025-03-22 21:27:42'),
(7, 1, 'Edited: Stock changed, 11 -> 10', 15, '2025-03-22 21:30:10'),
(8, 1, 'Edited: Price changed, 1000 -> 1001', 15, '2025-03-22 21:30:24'),
(9, 1, 'Edited: Price changed, 1001 -> 1000', 15, '2025-03-22 21:32:02'),
(10, 3, 'Edited: Stock changed, 0 -> 1, Item Name changed, Test3 -> test3, Display Name changed, Test3 -> test3', 15, '2025-03-22 21:32:20'),
(11, 5, 'Edited: Stock changed, 17 -> 10, Item Name changed, test5 -> test4, Display Name changed, Test Product 5 -> Test Product 4, Description changed, Test Product 5 -> Test Product 4', 15, '2025-03-22 21:32:46'),
(12, 6, 'Created', 15, '2025-03-22 21:33:20'),
(13, 6, 'Deleted', 15, '2025-03-22 21:33:52'),
(14, 1, 'Edited: Price changed, 1000 -> 1, Stock changed, 10 -> 1', 15, '2025-03-22 21:36:56'),
(15, 2, 'Edited: Stock changed, 0 -> 1', 15, '2025-03-22 21:39:46'),
(16, 2, 'Edited: Stock changed, 1 -> 0', 15, '2025-03-22 21:41:23'),
(17, 2, 'Edited: Price changed, 2000 -> 0', 15, '2025-03-22 21:41:28'),
(18, 2, 'Edited: Price changed, 0 -> 3, Stock changed, 0 -> 4', 15, '2025-03-22 21:41:40'),
(19, 7, 'Created', 15, '2025-03-22 21:41:49'),
(20, 7, 'Deleted', 15, '2025-03-22 21:41:55'),
(21, 1, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cajaqnSJar1KEm6qAR5iyVDJYaywOFks8A&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 15, '2025-03-22 21:44:28'),
(22, 2, 'Edited: Image URL changed, https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png -> https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cajaqnSJar1KEm6qAR5iyVDJYaywOFks8A&s', 15, '2025-03-22 21:48:44'),
(23, 8, 'Created', 16, '2025-03-22 22:07:19'),
(24, 8, 'Edited: Stock changed, 0 -> 10', 16, '2025-03-22 22:07:31'),
(25, 5, 'Deleted', 16, '2025-03-22 22:08:22'),
(26, 1, 'Edited: Price changed, 1 -> 0, Stock changed, 1 -> 0, Image URL changed, https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png -> https://mentalfitnessguru.hu/wp-content/uploads/2014/10/water1.jpg', 1, '2025-03-23 13:37:53');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `rolename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `roles`
--

INSERT INTO `roles` (`id`, `rolename`) VALUES
(0, 'User'),
(1, 'Admin');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number_countrycode` varchar(6) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `given_name` varchar(100) DEFAULT NULL,
  `family_name` varchar(100) DEFAULT NULL,
  `dob` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profile_picture` text DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106',
  `account_level` tinyint(4) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `last_modified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `number_countrycode`, `phone_number`, `password`, `given_name`, `family_name`, `dob`, `address`, `profile_picture`, `account_level`, `created_at`, `last_modified`) VALUES
(1, 'Navarra', 'Navarra123@Navarra123.Navarra123', '+36', NULL, '$argon2id$v=19$m=65536,t=3,p=4$4qbYQCHlOi+zzPiVZT6Ypg$FeVfD4C5gUKNQa67zU3UrK5HafhzVdtsf/E9EphpQkM', 'Tamás', 'Tóth', '1999-07-31', 'NavarraUser', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106', 1, '2025-02-26 11:39:20', '2025-03-23 13:40:04'),
(13, 'Test1234', 'Test1234@Test1234.Test1234', '', '308547689', '$argon2id$v=19$m=65536,t=3,p=4$G7FZrtDHUkvsKfafpmCRXg$75QcdOyJdMC9qrl5NdP6/4TYzAnMLosd+UsZbo5yCG0', 'Viktor', 'Palotás', NULL, 'Budapest, Margit Híd Tér 6', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106', 0, '2025-03-20 15:14:43', '2025-03-23 12:15:26'),
(14, 'Test1', 'Test1Test1@gmail.com', '', NULL, '$argon2id$v=19$m=65536,t=3,p=4$fdLEBz7hEWHTLQ//wcdZDQ$G3oZ1wbOq/ZJF030TfNGC6NedKlZTLbWUY/CC9Z846k', NULL, NULL, NULL, NULL, 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106', 0, '2025-03-22 19:52:29', '2025-03-23 11:55:22'),
(15, 'NavarraUser', 'NavarraUser@gmail.com', '+36', NULL, '$argon2id$v=19$m=65536,t=3,p=4$F6wg7Ud7D7NUU3ZxCu1aww$Ua8pzocBTl94t709LnBrDpeMPQDQTDLhhIQTGjWUAWM', 'Tamás', 'Tóth', NULL, 'NavarraUser', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106', 0, '2025-03-22 21:11:05', '2025-03-23 00:14:41'),
(16, 'Erika', 'erika@erika.erika', '+36', '205417845', '$argon2id$v=19$m=65536,t=3,p=4$K7Z3HvyFugSza6mCSvb1OQ$gySHFk0nDXM7KO56w1eDg2K0nIysLqr38ZwZ0uccHco', 'Erika', 'Horvath', '1994-02-20', 'Pest, Lajos utca 2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s', 0, '2025-03-22 22:03:50', '2025-03-22 23:17:44');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users_logs`
--

DROP TABLE IF EXISTS `users_logs`;
CREATE TABLE IF NOT EXISTS `users_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `modified` text NOT NULL,
  `modified_by` int(11) NOT NULL,
  `modified_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `modified_by` (`modified_by`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `users_logs`
--

INSERT INTO `users_logs` (`id`, `user_id`, `modified`, `modified_by`, `modified_at`) VALUES
(1, 1, 'Edited: Country Code changed,  -> +36, Given Name changed, Tamás -> Tamáss, Date of Birth changed, Mon Jan 01 2001 00:00:00 GMT+0100 (közép-európai téli idő) -> 2000-12-31', 1, '2025-03-23 11:36:38'),
(2, 1, 'Edited: Given Name changed, Tamáss -> Tamás, Date of Birth changed, Sun Dec 31 2000 00:00:00 GMT+0100 (közép-európai téli idő) -> 2000-12-30', 1, '2025-03-23 11:37:25'),
(3, 1, 'Edited: Family Name changed, Tóth -> Tóthh', 1, '2025-03-23 11:40:29'),
(4, 1, 'Edited: Family Name changed, Tóthh -> Tóth', 1, '2025-03-23 11:40:36'),
(5, 1, 'Edited: Email changed, Navarra123@Navarra123.Navarra123 -> Navarra123@Navarra123.Navarra1234, Given Name changed, Tamás -> Tamásss, Family Name changed, Tóth -> Tóthhh', 1, '2025-03-23 11:40:48'),
(6, 1, 'Edited: Email changed, Navarra123@Navarra123.Navarra1234 -> Navarra123@Navarra123.Navarra123, Given Name changed, Tamásss -> Tamás, Family Name changed, Tóthhh -> Tóthh', 1, '2025-03-23 11:41:07'),
(7, 1, 'Edited: Date of Birth changed, 2000-12-25 -> 2000-12-19', 1, '2025-03-23 11:41:12'),
(8, 1, 'Edited: Family Name changed, Tóthh -> Tóth', 1, '2025-03-23 11:41:34'),
(9, 1, 'Edited: Family Name changed, Tóth -> Tóthh', 1, '2025-03-23 11:41:46'),
(10, 1, 'Edited: Family Name changed, Tóthh -> Tóth', 1, '2025-03-23 11:44:28'),
(11, 1, 'Edited: Family Name changed, Tóth -> Tóthh', 1, '2025-03-23 11:51:18'),
(12, 1, 'Edited: Family Name changed, Tóthh -> Tóth', 1, '2025-03-23 11:51:30'),
(13, 13, 'Edited: Date of Birth changed, Fri Nov 27 1992 00:00:00 GMT+0100 (közép-európai téli idő) -> 1992-11-27, Account Level changed, 0 -> 1', 1, '2025-03-23 11:51:55'),
(14, 14, 'Edited: Account Level changed, 0 -> 1', 1, '2025-03-23 11:55:04'),
(15, 14, 'Edited: Account Level changed, 1 -> 0', 1, '2025-03-23 11:55:22'),
(16, 13, 'Edited: Date of Birth changed, Fri Nov 27 1992 00:00:00 GMT+0100 (közép-európai téli idő) -> 1992-11-27, Account Level changed, 1 -> 0', 1, '2025-03-23 11:55:30'),
(17, 1, 'Edited: Date of Birth changed, Thu Dec 14 2000 00:00:00 GMT+0100 (közép-európai téli idő) -> 2000-12-14, Profile Picture changed', 1, '2025-03-23 11:55:42'),
(18, 13, 'Edited: Date of Birth changed, Fri Nov 27 1992 00:00:00 GMT+0100 (közép-európai téli idő) -> 1992-11-27', 1, '2025-03-23 11:56:21'),
(19, 1, 'Edited: Date of Birth changed, Thu Dec 14 2000 00:00:00 GMT+0100 (közép-európai téli idő) -> 2000-12-14', 1, '2025-03-23 11:56:26'),
(20, 13, 'Edited: Date of Birth changed, Fri Nov 27 1992 00:00:00 GMT+0100 (közép-európai téli idő) -> 1992-11-27', 1, '2025-03-23 11:56:30'),
(21, 16, 'Edited: Date of Birth changed, Sun Feb 20 1994 00:00:00 GMT+0100 (közép-európai téli idő) -> 1994-02-20', 1, '2025-03-23 11:56:39'),
(22, 16, 'Edited: Date of Birth changed, Sun Feb 20 1994 00:00:00 GMT+0100 (közép-európai téli idő) -> 1994-02-20', 1, '2025-03-23 11:57:00'),
(23, 14, 'Edited: Date of Birth changed, null -> undefined', 1, '2025-03-23 12:14:53'),
(24, 13, 'Edited: Date of Birth changed, Fri Nov 27 1992 00:00:00 GMT+0100 (közép-európai téli idő) -> undefined', 1, '2025-03-23 12:15:26'),
(25, 1, 'Edited: Family Name changed, Tóth -> Tóthh', 1, '2025-03-23 12:16:37'),
(26, 1, 'Edited: Family Name changed, Tóthh -> Tóth', 1, '2025-03-23 12:16:52'),
(27, 1, 'Edited: Given Name changed, Tamás -> Tamáss, Family Name changed, Tóth -> Tóthh', 1, '2025-03-23 12:19:27'),
(28, 1, 'Edited: Given Name changed, Tamáss -> Tamás, Family Name changed, Tóthh -> Tóth', 1, '2025-03-23 12:19:41'),
(29, 1, 'Edited: Date of Birth changed, 2000-12-06 -> 2000-12-11', 1, '2025-03-23 12:20:30'),
(30, 1, 'Edited: Date of Birth changed, 2000-12-06 -> 2000-12-17', 1, '2025-03-23 12:23:39'),
(31, 14, 'Edited: Date of Birth changed, null -> undefined', 1, '2025-03-23 12:23:56'),
(32, 1, 'Edited: Date of Birth changed, 2000-12-16 -> 2000-12-02', 1, '2025-03-23 12:31:59'),
(33, 1, 'Edited: Date of Birth changed, 2000-11-21 -> 2000-11-22', 1, '2025-03-23 12:55:50'),
(34, 1, 'Edited: Date of Birth changed, 2000-11-22 -> undefined', 1, '2025-03-23 12:58:50'),
(35, 1, 'Edited: Date of Birth changed, null -> 2005-06-22', 1, '2025-03-23 13:02:09'),
(36, 1, 'Edited: Date of Birth changed, 2005-06-22 -> null', 1, '2025-03-23 13:12:09'),
(37, 1, 'Edited: Date of Birth changed, null -> 2002-01-07', 1, '2025-03-23 13:12:19'),
(38, 1, 'Edited: Phone Number changed, 305417245 -> null, Date of Birth changed, 2002-01-07 -> 1999-07-31, Address changed, 1234 ExampleCity, Example Adress 6 -> NavarraUser', 1, '2025-03-23 13:40:04');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
