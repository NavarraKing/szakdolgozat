-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2025. Már 28. 06:40
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
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `itemname`, `displayname`, `price`, `stock`, `description`, `image_url`, `created_by`, `created_at`, `last_modified`) VALUES
(1, 'test1', 'Test Product 1', 0, 2, 'This is a Test Product.', 'https://mentalfitnessguru.hu/wp-content/uploads/2014/10/water1.jpg', 1, '2025-02-26 10:59:29', '2025-03-26 19:58:43'),
(2, 'test2', 'Test Product 2', 3, 3, 'This is another test product.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cajaqnSJar1KEm6qAR5iyVDJYaywOFks8A&s', 1, '2025-02-26 11:11:22', '2025-03-26 16:50:58'),
(3, 'test3', 'Test Product 3', 999, 6, 'Test with a long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long description.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-20 14:24:24', '2025-03-26 16:50:58'),
(9, 'alma', 'Alma', 0, 5, 'Friss alma a kertből.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 2, '2025-03-24 08:00:00', '2025-03-26 19:58:43'),
(8, 'kenyer', 'Kenyer', 0, 6, 'Ez egy kenyér', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s', 16, '2025-03-22 21:07:19', '2025-03-26 16:50:58'),
(10, 'tej', 'Tej', 250, 6, 'Friss tej a farmról.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(11, 'vaj', 'Vaj', 500, 6, 'Kézműves vaj.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(12, 'sajt', 'Sajt', 800, 6, 'Érett sajt.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(13, 'kifli', 'Kifli', 100, 6, 'Friss péksütemény.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(14, 'zsemle', 'Zsemle', 120, 1, 'Puha zsemle.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 19:58:43'),
(15, 'keksz', 'Keksz', 300, 0, 'Csokis keksz.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 20:00:30'),
(16, 'csoki', 'Csokoládé', 400, 6, 'Étcsokoládé.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(17, 'kávé', 'Kávé', 1200, 6, 'Frissen pörkölt kávé.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(18, 'tea', 'Tea', 800, 1, 'Gyümölcsös tea.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 20:00:30'),
(19, 'cukor', 'Cukor', 200, 6, 'Kristálycukor.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(20, 'liszt', 'Liszt', 300, 6, 'Búzaliszt.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(21, 'tojás', 'Tojás', 50, 6, 'Friss tojás.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(22, 'méz', 'Méz', 1500, 6, 'Természetes méz.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(23, 'lekvár', 'Lekvár', 1000, 6, 'Házi lekvár.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(24, 'almaecet', 'Almaecet', 700, 6, 'Egészséges almaecet.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(25, 'olaj', 'Napraforgóolaj', 1200, 6, 'Hidegen sajtolt olaj.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(26, 'rizs', 'Rizs', 400, 6, 'Jázmin rizs.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(27, 'tészta', 'Tészta', 500, 6, 'Házi készítésű tészta.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(28, 'paradicsom', 'Paradicsom', 300, 6, 'Friss paradicsom.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(29, 'paprika', 'Paprika', 250, 6, 'Édes paprika.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(30, 'uborka', 'Uborka', 200, 6, 'Ropogós uborka.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(31, 'hagyma', 'Hagyma', 150, 6, 'Vöröshagyma.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(32, 'fokhagyma', 'Fokhagyma', 300, 6, 'Friss fokhagyma.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(33, 'burgonya', 'Burgonya', 200, 6, 'Újburgonya.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(34, 'répa', 'Répa', 150, 6, 'Friss sárgarépa.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(35, 'káposzta', 'Káposzta', 300, 6, 'Fejes káposzta.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(36, 'brokkoli', 'Brokkoli', 400, 6, 'Friss brokkoli.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58'),
(37, 'karfiol', 'Karfiol', 350, 6, 'Friss karfiol.', 'https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 0, '2025-03-26 12:16:34', '2025-03-26 16:50:58');

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
) ENGINE=MyISAM AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

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
(26, 1, 'Edited: Price changed, 1 -> 0, Stock changed, 1 -> 0, Image URL changed, https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png -> https://mentalfitnessguru.hu/wp-content/uploads/2014/10/water1.jpg', 1, '2025-03-23 13:37:53'),
(27, 18, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:15:57'),
(28, 23, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:03'),
(29, 22, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:08'),
(30, 21, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:12'),
(31, 19, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:18'),
(32, 20, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:22'),
(33, 17, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:34'),
(34, 16, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:37'),
(35, 15, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:42'),
(36, 14, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:47'),
(37, 13, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:52'),
(38, 12, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:16:56'),
(39, 11, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:17:01'),
(40, 9, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:17:05'),
(41, 10, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:17:10'),
(42, 37, 'Edited: Image URL changed, https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s -> https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png', 1, '2025-03-26 13:17:25'),
(43, 8, 'Sold: Stock changed, 10 -> 9', 1, '2025-03-26 13:47:45'),
(44, 3, 'Sold: Stock changed, 1 -> 0', 1, '2025-03-26 13:47:45'),
(45, 9, 'Sold: Stock changed, 50 -> 44', 1, '2025-03-26 13:51:10'),
(46, 2, 'Sold: Stock changed, 4 -> 1', 1, '2025-03-26 13:51:10'),
(47, 12, 'Sold: Stock changed, 15 -> 14', 1, '2025-03-26 13:56:19'),
(48, 13, 'Sold: Stock changed, 100 -> 95', 1, '2025-03-26 13:56:19'),
(49, 18, 'Sold: Stock changed, 35 -> 34', 1, '2025-03-26 13:56:19'),
(50, 22, 'Sold: Stock changed, 10 -> 9', 1, '2025-03-26 13:56:19'),
(51, 9, 'Sold: Stock changed, 44 -> 0', 1, '2025-03-26 13:57:38'),
(52, 8, 'Sold: Stock changed, 9 -> 8', 1, '2025-03-26 13:57:38'),
(53, 12, 'Sold: Stock changed, 14 -> 13', 1, '2025-03-26 13:57:38'),
(54, 2, 'Sold: Stock changed, 1 -> 0', 1, '2025-03-26 13:59:11'),
(55, 10, 'Sold: Stock changed, 30 -> 29', 1, '2025-03-26 13:59:11'),
(56, 11, 'Sold: Stock changed, 20 -> 19', 1, '2025-03-26 13:59:11'),
(57, 9, 'Edited: Price changed, 150 -> 0, Stock changed, 0 -> 4', 1, '2025-03-26 14:00:22'),
(58, 9, 'Sold: Stock changed, 4 -> 0', 1, '2025-03-26 14:21:21'),
(59, 8, 'Sold: Stock changed, 8 -> 0', 1, '2025-03-26 14:21:21'),
(60, 11, 'Sold: Stock changed, 19 -> 18', 1, '2025-03-26 14:21:42'),
(61, 1, 'Edited: Stock changed, 0 -> 200', 1, '2025-03-26 14:22:16'),
(62, 2, 'Edited: Stock changed, 0 -> 100', 1, '2025-03-26 14:22:20'),
(63, 3, 'Edited: Stock changed, 0 -> 100', 1, '2025-03-26 14:22:23'),
(64, 8, 'Edited: Stock changed, 0 -> 100', 1, '2025-03-26 14:22:27'),
(65, 9, 'Edited: Stock changed, 0 -> 100', 1, '2025-03-26 14:22:31'),
(66, 9, 'Sold: Stock changed, 100 -> 99', 1, '2025-03-26 14:29:37'),
(67, 17, 'Sold: Stock changed, 25 -> 0', 1, '2025-03-26 14:30:09'),
(68, 1, 'Sold: Stock changed, 200 -> 199', 1, '2025-03-26 14:30:09'),
(69, 8, 'Sold: Stock changed, 100 -> 99', 1, '2025-03-26 14:31:10'),
(70, 9, 'Sold: Stock changed, 99 -> 98', 1, '2025-03-26 14:51:40'),
(71, 12, 'Sold: Stock changed, 13 -> 12', 1, '2025-03-26 15:09:07'),
(72, 8, 'Sold: Stock changed, 99 -> 98', 15, '2025-03-26 15:22:39'),
(73, 3, 'Sold: Stock changed, 100 -> 99', 15, '2025-03-26 15:22:39'),
(74, 11, 'Sold: Stock changed, 18 -> 17', 1, '2025-03-26 15:39:20'),
(75, 21, 'Sold: Stock changed, 200 -> 193', 1, '2025-03-26 15:39:20'),
(76, 1, 'Sold: Stock changed, 199 -> 198', 1, '2025-03-26 15:39:20'),
(77, 2, 'Sold: Stock changed, 100 -> 96', 1, '2025-03-26 15:42:12'),
(78, 9, 'Sold: Stock changed, 98 -> 97', 1, '2025-03-26 15:42:12'),
(79, 10, 'Sold: Stock changed, 29 -> 28', 1, '2025-03-26 15:51:39'),
(80, 11, 'Sold: Stock changed, 17 -> 16', 1, '2025-03-26 15:51:39'),
(81, 20, 'Sold: Stock changed, 70 -> 48', 1, '2025-03-26 15:52:17'),
(82, 1, 'Sold: Stock changed, 198 -> 191', 1, '2025-03-26 15:52:17'),
(83, 33, 'Sold: Stock changed, 110 -> 102', 1, '2025-03-26 15:52:17'),
(84, 1, 'Set stock: 191 -> 3', 1, '2025-03-26 16:50:58'),
(85, 2, 'Set stock: 96 -> 3', 1, '2025-03-26 16:50:58'),
(86, 3, 'Set stock: 99 -> 6', 1, '2025-03-26 16:50:58'),
(87, 8, 'Set stock: 98 -> 6', 1, '2025-03-26 16:50:58'),
(88, 9, 'Set stock: 97 -> 6', 1, '2025-03-26 16:50:58'),
(89, 10, 'Set stock: 28 -> 6', 1, '2025-03-26 16:50:58'),
(90, 11, 'Set stock: 16 -> 6', 1, '2025-03-26 16:50:58'),
(91, 12, 'Set stock: 12 -> 6', 1, '2025-03-26 16:50:58'),
(92, 13, 'Set stock: 95 -> 6', 1, '2025-03-26 16:50:58'),
(93, 14, 'Set stock: 80 -> 6', 1, '2025-03-26 16:50:58'),
(94, 15, 'Set stock: 60 -> 6', 1, '2025-03-26 16:50:58'),
(95, 16, 'Set stock: 40 -> 6', 1, '2025-03-26 16:50:58'),
(96, 17, 'Set stock: 0 -> 6', 1, '2025-03-26 16:50:58'),
(97, 18, 'Set stock: 34 -> 6', 1, '2025-03-26 16:50:58'),
(98, 19, 'Set stock: 50 -> 6', 1, '2025-03-26 16:50:58'),
(99, 20, 'Set stock: 48 -> 6', 1, '2025-03-26 16:50:58'),
(100, 21, 'Set stock: 193 -> 6', 1, '2025-03-26 16:50:58'),
(101, 22, 'Set stock: 9 -> 6', 1, '2025-03-26 16:50:58'),
(102, 23, 'Set stock: 20 -> 6', 1, '2025-03-26 16:50:58'),
(103, 24, 'Set stock: 15 -> 6', 1, '2025-03-26 16:50:58'),
(104, 25, 'Set stock: 30 -> 6', 1, '2025-03-26 16:50:58'),
(105, 26, 'Set stock: 40 -> 6', 1, '2025-03-26 16:50:58'),
(106, 27, 'Set stock: 50 -> 6', 1, '2025-03-26 16:50:58'),
(107, 28, 'Set stock: 60 -> 6', 1, '2025-03-26 16:50:58'),
(108, 29, 'Set stock: 70 -> 6', 1, '2025-03-26 16:50:58'),
(109, 30, 'Set stock: 80 -> 6', 1, '2025-03-26 16:50:58'),
(110, 31, 'Set stock: 90 -> 6', 1, '2025-03-26 16:50:58'),
(111, 32, 'Set stock: 100 -> 6', 1, '2025-03-26 16:50:58'),
(112, 33, 'Set stock: 102 -> 6', 1, '2025-03-26 16:50:58'),
(113, 34, 'Set stock: 120 -> 6', 1, '2025-03-26 16:50:58'),
(114, 35, 'Set stock: 130 -> 6', 1, '2025-03-26 16:50:58'),
(115, 36, 'Set stock: 140 -> 6', 1, '2025-03-26 16:50:58'),
(116, 37, 'Set stock: 150 -> 6', 1, '2025-03-26 16:50:58'),
(117, 1, 'Sold: Stock changed, 3 -> 2', 1, '2025-03-26 19:58:43'),
(118, 9, 'Sold: Stock changed, 6 -> 5', 1, '2025-03-26 19:58:43'),
(119, 14, 'Sold: Stock changed, 6 -> 1', 1, '2025-03-26 19:58:43'),
(120, 15, 'Sold: Stock changed, 6 -> 0', 1, '2025-03-26 20:00:30'),
(121, 18, 'Sold: Stock changed, 6 -> 1', 1, '2025-03-26 20:00:30');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `receipts`
--

DROP TABLE IF EXISTS `receipts`;
CREATE TABLE IF NOT EXISTS `receipts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_id` int(11) NOT NULL,
  `items` text NOT NULL,
  `payment_method` varchar(30) NOT NULL,
  `total_price` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `seller_id` (`seller_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `receipts`
--

INSERT INTO `receipts` (`id`, `seller_id`, `items`, `payment_method`, `total_price`, `created_at`) VALUES
(20, 1, '[{\"id\":15,\"name\":\"keksz\",\"price\":300,\"quantity\":6,\"total\":1800},{\"id\":18,\"name\":\"tea\",\"price\":800,\"quantity\":5,\"total\":4000}]', 'cash', 5800, '2025-03-26 20:00:30'),
(19, 1, '[{\"id\":1,\"name\":\"test1\",\"price\":0,\"quantity\":1,\"total\":0},{\"id\":9,\"name\":\"alma\",\"price\":0,\"quantity\":1,\"total\":0},{\"id\":14,\"name\":\"zsemle\",\"price\":120,\"quantity\":5,\"total\":600}]', 'cash', 600, '2025-03-26 19:58:43'),
(17, 1, '[{\"id\":10,\"name\":\"tej\",\"price\":250,\"quantity\":1,\"total\":250},{\"id\":11,\"name\":\"vaj\",\"price\":500,\"quantity\":1,\"total\":500}]', 'cash', 750, '2025-03-26 15:51:39'),
(18, 1, '[{\"id\":20,\"name\":\"liszt\",\"price\":300,\"quantity\":22,\"total\":6600},{\"id\":1,\"name\":\"test1\",\"price\":0,\"quantity\":7,\"total\":0},{\"id\":33,\"name\":\"burgonya\",\"price\":200,\"quantity\":8,\"total\":1600}]', 'cash', 8200, '2025-03-26 15:52:17');

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
(0, 'Seller'),
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
(1, 'Navarra', 'Navarra123@Navarra123.Navarra123', '+36', NULL, '$argon2id$v=19$m=65536,t=3,p=4$4qbYQCHlOi+zzPiVZT6Ypg$FeVfD4C5gUKNQa67zU3UrK5HafhzVdtsf/E9EphpQkM', 'Tamás', 'Tóth', '1999-07-31', NULL, 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106', 1, '2025-02-26 11:39:20', '2025-03-26 15:32:35'),
(13, 'Test1234', 'Test1234@Test1234.Test1234', '', '308547689', '$argon2id$v=19$m=65536,t=3,p=4$G7FZrtDHUkvsKfafpmCRXg$75QcdOyJdMC9qrl5NdP6/4TYzAnMLosd+UsZbo5yCG0', 'Viktor', 'Palotás', NULL, 'Budapest, Margit Híd Tér 6', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106', 0, '2025-03-20 15:14:43', '2025-03-23 12:15:26'),
(14, 'Test1', 'Test1Test1@gmail.com', '', NULL, '$argon2id$v=19$m=65536,t=3,p=4$fdLEBz7hEWHTLQ//wcdZDQ$G3oZ1wbOq/ZJF030TfNGC6NedKlZTLbWUY/CC9Z846k', NULL, NULL, NULL, NULL, 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106', 0, '2025-03-22 19:52:29', '2025-03-23 11:55:22'),
(15, 'NavarraUser', 'NavarraUser@gmail.com', '+36', NULL, '$argon2id$v=19$m=65536,t=3,p=4$F6wg7Ud7D7NUU3ZxCu1aww$Ua8pzocBTl94t709LnBrDpeMPQDQTDLhhIQTGjWUAWM', 'Tamás', 'Tóth', NULL, 'NavarraUser', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106', 0, '2025-03-22 21:11:05', '2025-03-23 00:14:41'),
(16, 'Erika', 'erika@erika.erika', '+36', '205417845', '$argon2id$v=19$m=65536,t=3,p=4$K7Z3HvyFugSza6mCSvb1OQ$gySHFk0nDXM7KO56w1eDg2K0nIysLqr38ZwZ0uccHco', 'Erika', 'Horvath', '1994-02-20', 'Pest, Lajos utca 2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNt2YjNbze4sZaf0Q7YzA_83AEw2nCRXT2g&s', 1, '2025-03-22 22:03:50', '2025-03-26 14:54:39');

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
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

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
(38, 1, 'Edited: Phone Number changed, 305417245 -> null, Date of Birth changed, 2002-01-07 -> 1999-07-31, Address changed, 1234 ExampleCity, Example Adress 6 -> NavarraUser', 1, '2025-03-23 13:40:04'),
(39, 16, 'Edited: Account Level changed, 0 -> 1', 1, '2025-03-26 14:54:39'),
(40, 1, 'Edited: Address changed, NavarraUser -> null', 1, '2025-03-26 15:32:36');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
