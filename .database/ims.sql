-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2025. Már 30. 15:40
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
CREATE DATABASE IF NOT EXISTS `ims` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_hungarian_ci;
USE `ims`;

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
  `image_url` text DEFAULT 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `last_modified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `itemname`, `displayname`, `price`, `stock`, `description`, `image_url`, `created_by`, `created_at`, `last_modified`) VALUES
(1, 'cheeseburger', 'Cheeseburger', 11, 99, 'A delicious cheeseburger with melted cheese.', 'https://t3.ftcdn.net/jpg/12/15/44/76/360_F_1215447672_pfEcb6sxQb7g6qSVCIrDJSWk8XYo9AGn.jpg', 0, '2025-03-30 12:36:26', '2025-04-05 19:27:21'),
(2, 'chocolateshake', 'Chocolate Shake', 7, 200, 'A creamy chocolate milkshake.', 'https://t4.ftcdn.net/jpg/05/83/27/97/360_F_583279705_3ApajXiewkJCWg2cysoDrAJHZqAwjT1t.jpg', 0, '2025-03-30 12:36:26', '2025-04-05 18:39:25'),
(3, 'largefries', 'Large Fries', 3, 150, 'Crispy golden fries in a large serving.', 'https://t4.ftcdn.net/jpg/12/65/11/65/360_F_1265116550_XEy7H051ouOcCe7Ti6ve5ZrJb5gQKLBx.jpg', 0, '2025-03-30 12:36:26', '2025-04-05 18:41:25'),
(4, 'mediumfries', 'Medium Fries', 2, 100, 'Crispy golden fries in a medium serving.', 'https://t3.ftcdn.net/jpg/00/46/24/84/360_F_46248483_gyGNXtWgaJjB1VzBmsnfmiiTedw1Da2j.jpg', 0, '2025-03-30 12:36:26', '2025-04-05 18:41:19'),
(5, 'bigcocacola', 'Big Coca Cola', 5, 94, 'A refreshing large Coca Cola.', 'https://t4.ftcdn.net/jpg/02/84/65/61/360_F_284656117_sPF8gVWaX627bq5qKrlrvCz1eFfowdBf.jpg', 0, '2025-03-30 12:36:26', '2025-04-05 18:41:59'),
(6, 'smallcocacola', 'Small Coca Cola', 2, 84, 'A refreshing small Coca Cola.', 'https://t4.ftcdn.net/jpg/03/02/06/91/360_F_302069193_28NB8ujDIqbyrrgfOW9RrFaB4S0QaWlS.jpg', 0, '2025-03-30 12:36:26', '2025-04-05 18:42:17'),
(7, 'chickennuggets', 'Chicken Nuggets', 5, 112, 'Crispy and tender chicken nuggets.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 14:25:01'),
(8, 'fishsandwich', 'Fish Sandwich', 6, 75, 'A tasty fish sandwich with tartar sauce.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(9, 'vanillashake', 'Vanilla Shake', 7, 109, 'A creamy vanilla milkshake.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 15:18:17'),
(10, 'strawberryshake', 'Strawberry Shake', 7, 94, 'A creamy strawberry milkshake.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 15:18:17'),
(11, 'applepie', 'Apple Pie', 0, 129, 'A warm and sweet apple pie.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 14:25:27'),
(12, 'eggmuffin', 'Egg Muffin', 4, 90, 'A classic breakfast sandwich with egg and cheese.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(13, 'sausagemuffin', 'Sausage Muffin', 5, 80, 'A breakfast sandwich with sausage and cheese.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(14, 'hotcakes', 'Hotcakes', 6, 70, 'Fluffy pancakes served with syrup.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(15, 'hashbrowns', 'Hash Browns', 2, 115, 'Crispy and golden hash browns.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(16, 'grilledchickensandwich', 'Grilled Chicken Sandwich', 8, 65, 'A grilled chicken sandwich with fresh lettuce.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(17, 'doublecheeseburger', 'Double Cheeseburger', 9, 50, 'A cheeseburger with double the meat and cheese.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(18, 'flurry', 'Flurry', 5, 140, 'A creamy dessert with mix-ins.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(19, 'chickenwrap', 'Chicken Wrap', 6, 85, 'A wrap filled with crispy chicken and fresh veggies.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(20, 'sidesalad', 'Side Salad', 3, 100, 'A fresh and healthy side salad.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(21, 'baconcheeseburger', 'Bacon Cheeseburger', 10, 60, 'A cheeseburger topped with crispy bacon.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(22, 'spicychickensandwich', 'Spicy Chicken Sandwich', 7, 75, 'A spicy chicken sandwich with a kick.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(23, 'crispychickensandwich', 'Crispy Chicken Sandwich', 8, 75, 'A crispy chicken sandwich with fresh lettuce.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(24, 'mozzarellasticks', 'Mozzarella Sticks', 6, 95, 'Crispy and cheesy mozzarella sticks.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(25, 'bbqburger', 'BBQ Burger', 9, 50, 'A burger with tangy BBQ sauce and crispy onions.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(26, 'chickensalad', 'Chicken Salad', 7, 80, 'A fresh salad topped with grilled chicken.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(27, 'onionrings', 'Onion Rings', 4, 120, 'Crispy and golden onion rings.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(28, 'icedcoffee', 'Iced Coffee', 3, 140, 'A refreshing iced coffee.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(29, 'chocolatechipcookie', 'Chocolate Chip Cookie', 2, 200, 'A warm and gooey chocolate chip cookie.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(30, 'spicyfries', 'Spicy Fries', 3, 105, 'Crispy fries with a spicy seasoning.', 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg', 0, '2025-03-30 12:36:26', '2025-03-30 12:36:26'),
(31, 'espresso', 'Espresso', 2, 200, 'A hot cup of espresso.', 'https://t3.ftcdn.net/jpg/12/82/24/46/360_F_1282244609_O7Vt8MQEJihlXeTVYjGOcnLngDn78sZk.jpg', 1, '2025-03-30 13:01:58', '2025-03-30 13:01:58'),
(32, 'smallfries', 'Small Fries', 1, 135, 'Crispy golden fries in a small serving with additional dipping sauce.', 'https://t3.ftcdn.net/jpg/04/97/29/36/360_F_497293618_kSe8uJx3ngtt6a8uidFgKli7eoMzeYDn.jpg', 1, '2025-03-30 13:03:57', '2025-03-30 13:03:57');

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
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `products_logs`
--

INSERT INTO `products_logs` (`id`, `product_id`, `modified`, `modified_by`, `modified_at`) VALUES
(1, 31, 'Created', 1, '2025-03-30 13:01:58'),
(2, 32, 'Created', 1, '2025-03-30 13:03:57'),
(3, 5, 'Edited: Price changed, 4 -> 5, Stock changed, 95 -> 97', 1, '2025-03-30 14:24:41'),
(4, 4, 'Sold: Stock changed, 105 -> 101', 1, '2025-03-30 14:25:01'),
(5, 7, 'Sold: Stock changed, 120 -> 112', 1, '2025-03-30 14:25:01'),
(6, 11, 'Edited: Price changed, 3 -> 0', 1, '2025-03-30 14:25:13'),
(7, 11, 'Sold: Stock changed, 130 -> 129', 1, '2025-03-30 14:25:27'),
(8, 4, 'Sold: Stock changed, 101 -> 100', 1, '2025-03-30 14:25:27'),
(9, 5, 'Sold: Stock changed, 97 -> 94', 2, '2025-03-30 14:25:41'),
(10, 6, 'Sold: Stock changed, 85 -> 84', 2, '2025-03-30 15:18:17'),
(11, 10, 'Sold: Stock changed, 95 -> 94', 2, '2025-03-30 15:18:17'),
(12, 9, 'Sold: Stock changed, 110 -> 109', 2, '2025-03-30 15:18:17');

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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `receipts`
--

INSERT INTO `receipts` (`id`, `seller_id`, `items`, `payment_method`, `total_price`, `created_at`) VALUES
(1, 1, '[{\"id\":4,\"name\":\"mediumfries\",\"price\":2,\"quantity\":4,\"total\":8},{\"id\":7,\"name\":\"chickennuggets\",\"price\":5,\"quantity\":8,\"total\":40}]', 'card', 48, '2025-03-30 14:25:01'),
(2, 1, '[{\"id\":11,\"name\":\"applepie\",\"price\":0,\"quantity\":1,\"total\":0},{\"id\":4,\"name\":\"mediumfries\",\"price\":2,\"quantity\":1,\"total\":2}]', 'cash', 2, '2025-03-30 14:25:27'),
(3, 2, '[{\"id\":5,\"name\":\"bigcocacola\",\"price\":5,\"quantity\":3,\"total\":15}]', 'card', 15, '2025-03-30 14:25:41'),
(4, 2, '[{\"id\":6,\"name\":\"smallcocacola\",\"price\":2,\"quantity\":1,\"total\":2},{\"id\":10,\"name\":\"strawberryshake\",\"price\":7,\"quantity\":1,\"total\":7},{\"id\":9,\"name\":\"vanillashake\",\"price\":7,\"quantity\":1,\"total\":7}]', 'card', 16, '2025-03-30 15:18:17');

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
  `number_countrycode` varchar(6) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `given_name` varchar(100) DEFAULT NULL,
  `family_name` varchar(100) DEFAULT NULL,
  `dob` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profile_picture` text DEFAULT 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
  `account_level` tinyint(4) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `last_modified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `number_countrycode`, `phone_number`, `password`, `given_name`, `family_name`, `dob`, `address`, `profile_picture`, `account_level`, `created_at`, `last_modified`) VALUES
(1, 'ExampleAdmin', 'ExampleAdmin@gmail.com', '+36', '701234567', '$argon2id$v=19$m=65536,t=3,p=4$8yGBrNyb2rvOxnSYqMDfzg$rcpQ7rqi3z+/cmUOEbAwdbppQV02y2MHK2sDEbn0NNk', 'Admin', 'Example', '2002-02-14', '1234, Example City, Example Street 1', 'https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg', 1, '2025-03-30 13:07:41', '2025-03-30 13:11:24'),
(2, 'ExampleUser', 'ExampleUser@gmail.com', '+36', '301234567', '$argon2id$v=19$m=65536,t=3,p=4$rGc+KZF5zTPyEytpg0BtLg$v/amqvQX9G9DSqhcXdJV2pd9ozShBLuStgBTL3IVTuM', 'User', 'Example', '2000-11-24', '1234 Example City, Example Street 2', 'https://t4.ftcdn.net/jpg/02/60/78/83/360_F_260788352_x5sSHM4DGvpjHj9wz8sFltzAPktQwJCj.jpg', 0, '2025-03-30 13:08:25', '2025-03-30 13:14:00');

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
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `users_logs`
--

INSERT INTO `users_logs` (`id`, `user_id`, `modified`, `modified_by`, `modified_at`) VALUES
(1, 1, 'Edited: Phone Number changed, null -> 701234567, Country Code changed, null -> +36, Given Name changed, null -> Admin, Family Name changed, null -> Example, Date of Birth changed, null -> 2002-02-14, Address changed, null -> 1234, Example City, Example Street 1, Profile Picture changed', 1, '2025-03-30 13:11:24'),
(2, 2, 'Edited: Phone Number changed, null -> 301234567, Given Name changed, null -> User, Family Name changed, null -> Example, Date of Birth changed, null -> 2000-11-24, Address changed, null -> 1234 Example City, Example Street 2, Profile Picture changed', 1, '2025-03-30 13:13:41');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
