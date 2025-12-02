-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2025 at 02:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogproduct`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `heroImageUrl` varchar(500) DEFAULT NULL,
  `title` varchar(500) NOT NULL,
  `date` date NOT NULL,
  `author` varchar(255) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `heroImageUrl`, `title`, `date`, `author`, `content`) VALUES
(1, 'https://example.com/blog/tech-trends-2024.jpg', '10 Tech Trends to Watch in 2024', '2024-01-15', 'Jennifer Williams', 'Technology continues to evolve at a rapid pace. In this article, we explore the top 10 technology trends that are shaping the future, from AI advancements to quantum computing breakthroughs. These innovations are set to transform how we live and work...'),
(2, 'https://example.com/blog/sustainable-fashion.jpg', 'The Rise of Sustainable Fashion', '2024-02-20', 'Michael Brown', 'Sustainability is no longer just a buzzword in the fashion industry. Consumers are increasingly demanding eco-friendly options, and brands are responding. Learn about the latest sustainable materials, ethical manufacturing processes, and how you can make more conscious fashion choices...'),
(3, 'https://example.com/blog/home-gardening.jpg', 'Beginner\'s Guide to Home Gardening', '2024-03-10', 'Lisa Anderson', 'Starting a home garden can seem daunting, but with the right guidance, anyone can grow their own fresh vegetables and herbs. This comprehensive guide covers everything from choosing the right location to harvesting your first crop...'),
(4, 'https://example.com/blog/fitness-tips.jpg', '5 Fitness Tips for Busy Professionals', '2024-04-05', 'David Martinez', 'Finding time to exercise when you have a demanding job can be challenging. Here are five practical fitness tips that busy professionals can easily incorporate into their daily routines, from desk exercises to quick morning workouts...'),
(5, 'https://example.com/blog/book-recommendations.jpg', 'Must-Read Books of 2024', '2024-05-12', 'Emily Parker', 'From gripping thrillers to thought-provoking non-fiction, 2024 has already given us some incredible books. Here are our top recommendations across various genres that you should add to your reading list...');

-- --------------------------------------------------------

--
-- Table structure for table `blograting`
--

CREATE TABLE `blograting` (
  `id` int(11) NOT NULL,
  `blogId` int(11) NOT NULL,
  `author` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` in (1,-1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blograting`
--

INSERT INTO `blograting` (`id`, `blogId`, `author`, `rating`) VALUES
(1, 1, 'Sarah Thompson', 1),
(2, 1, 'James Wilson', 1),
(3, 1, 'Maria Garcia', 1),
(4, 1, 'Robert Lee', -1),
(5, 2, 'Amanda White', 1),
(6, 2, 'Kevin Brown', 1),
(7, 2, 'Nicole Davis', 1),
(8, 2, 'Mark Johnson', 1),
(9, 3, 'Laura Martinez', 1),
(10, 3, 'Steven Clark', 1),
(11, 3, 'Rachel Adams', -1),
(12, 4, 'Brian Taylor', 1),
(13, 4, 'Michelle Moore', 1),
(14, 4, 'Daniel Harris', 1),
(15, 4, 'Jessica Martin', -1),
(16, 5, 'Christopher Lee', 1),
(17, 5, 'Patricia Robinson', 1),
(18, 5, 'Anthony Walker', 1),
(19, 5, 'Linda Hall', 1),
(20, 5, 'Matthew Young', -1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Home & Garden'),
(4, 'Sports & Outdoors'),
(5, 'Books');

-- --------------------------------------------------------

--
-- Table structure for table `productimage`
--

CREATE TABLE `productimage` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productimage`
--

INSERT INTO `productimage` (`id`, `productId`, `url`) VALUES
(1, 1, 'https://example.com/images/headphones-1.jpg'),
(2, 1, 'https://example.com/images/headphones-2.jpg'),
(3, 2, 'https://example.com/images/phone-stand-1.jpg'),
(4, 3, 'https://example.com/images/tshirt-blue.jpg'),
(5, 3, 'https://example.com/images/tshirt-white.jpg'),
(6, 3, 'https://example.com/images/tshirt-black.jpg'),
(7, 4, 'https://example.com/images/jeans-1.jpg'),
(8, 5, 'https://example.com/images/garden-tools.jpg'),
(9, 6, 'https://example.com/images/plant-pot-1.jpg'),
(10, 7, 'https://example.com/images/yoga-mat.jpg'),
(11, 8, 'https://example.com/images/running-shoes-1.jpg'),
(12, 8, 'https://example.com/images/running-shoes-2.jpg'),
(13, 9, 'https://example.com/images/mystery-book-cover.jpg'),
(14, 10, 'https://example.com/images/cookbook-cover.jpg'),
(15, 11, 'https://example.com/images/smart-tv-1.jpg'),
(16, 11, 'https://example.com/images/smart-tv-2.jpg'),
(17, 11, 'https://example.com/images/smart-tv-3.jpg'),
(18, 12, 'https://example.com/images/bluetooth-speaker-1.jpg'),
(19, 12, 'https://example.com/images/bluetooth-speaker-2.jpg'),
(20, 13, 'https://example.com/images/leather-jacket-1.jpg'),
(21, 13, 'https://example.com/images/leather-jacket-2.jpg'),
(22, 14, 'https://example.com/images/sneakers-1.jpg'),
(23, 14, 'https://example.com/images/sneakers-2.jpg'),
(24, 14, 'https://example.com/images/sneakers-3.jpg'),
(25, 15, 'https://example.com/images/robot-vacuum-1.jpg'),
(26, 15, 'https://example.com/images/robot-vacuum-2.jpg'),
(27, 16, 'https://example.com/images/air-purifier-1.jpg'),
(28, 16, 'https://example.com/images/air-purifier-2.jpg'),
(29, 17, 'https://example.com/images/mountain-bike-1.jpg'),
(30, 17, 'https://example.com/images/mountain-bike-2.jpg'),
(31, 18, 'https://example.com/images/camping-tent-1.jpg'),
(32, 18, 'https://example.com/images/camping-tent-2.jpg'),
(33, 19, 'https://example.com/images/coffee-maker-1.jpg'),
(34, 19, 'https://example.com/images/coffee-maker-2.jpg'),
(35, 20, 'https://example.com/images/electric-kettle-1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `productqna`
--

CREATE TABLE `productqna` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productqna`
--

INSERT INTO `productqna` (`id`, `productId`, `question`, `answer`) VALUES
(1, 1, 'Do these headphones work with iPhone?', 'Yes, they are compatible with all Bluetooth-enabled devices including iPhone.'),
(2, 1, 'What is the warranty period?', 'These headphones come with a 1-year manufacturer warranty.'),
(3, 2, 'Can this stand hold a tablet?', 'Yes, it can hold devices up to 10 inches.'),
(4, 3, 'Is this pre-shrunk?', 'Yes, the t-shirt is pre-shrunk to prevent shrinking after washing.'),
(5, 4, 'What sizes are available?', 'We have sizes from 28 to 40 waist.'),
(6, 5, 'Are the tools rust-resistant?', 'Yes, all tools are made from stainless steel and are rust-resistant.'),
(7, 7, 'What are the dimensions?', 'The mat measures 72 inches long and 24 inches wide.'),
(8, 8, 'Are these suitable for trail running?', 'These are designed for road running. We recommend our Trail Runner model for off-road use.'),
(9, 9, 'Is this part of a series?', 'Yes, this is the first book in a trilogy.'),
(10, 10, 'Are there vegetarian recipes included?', 'Yes, approximately 50 recipes are vegetarian or can be easily adapted.'),
(11, 11, 'Does this TV support Netflix and YouTube?', 'Yes, it comes with all major streaming apps pre-installed including Netflix, YouTube, Amazon Prime, and more.'),
(12, 11, 'What is the refresh rate?', 'This TV has a 60Hz refresh rate, perfect for movies and casual gaming.'),
(13, 12, 'Is this speaker really waterproof?', 'Yes, it has an IPX7 waterproof rating, meaning it can be submerged in water up to 1 meter for 30 minutes.'),
(14, 13, 'How should I care for this leather jacket?', 'We recommend using a leather conditioner every few months and avoiding prolonged exposure to rain.'),
(15, 14, 'Do these sneakers run true to size?', 'Yes, they run true to size. We recommend ordering your normal shoe size.'),
(16, 15, 'Can the robot vacuum clean multiple rooms?', 'Yes, it uses smart mapping to navigate and clean multiple rooms efficiently.'),
(17, 16, 'How often do I need to replace the filter?', 'We recommend replacing the HEPA filter every 6-12 months depending on usage.'),
(18, 17, 'Is this bike suitable for beginners?', 'Yes, it is perfect for both beginners and intermediate riders.'),
(19, 18, 'How long does it take to set up the tent?', 'The tent can be set up in approximately 10-15 minutes with two people.'),
(20, 19, 'Can I program the coffee maker to brew automatically?', 'Yes, you can program it up to 24 hours in advance.'),
(21, 20, 'Does the kettle have auto shut-off?', 'Yes, it automatically shuts off when the water reaches boiling point for safety.');

-- --------------------------------------------------------

--
-- Table structure for table `productrating`
--

CREATE TABLE `productrating` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `author` varchar(255) NOT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productrating`
--

INSERT INTO `productrating` (`id`, `productId`, `rating`, `author`, `comment`) VALUES
(1, 1, 5, 'Sarah Johnson', 'Amazing sound quality and battery life is as advertised!'),
(2, 1, 4, 'Mike Chen', 'Great headphones, but a bit tight on larger heads.'),
(3, 1, 5, 'Emma Davis', 'Best purchase I made this year. Noise cancellation is superb.'),
(4, 2, 5, 'Alex Brown', 'Sturdy and looks great on my desk.'),
(5, 2, 4, 'Lisa White', 'Good value for money, holds my phone securely.'),
(6, 3, 5, 'Tom Wilson', 'Perfect fit and very comfortable.'),
(7, 3, 3, 'Rachel Green', 'Good quality but color faded after a few washes.'),
(8, 4, 4, 'David Lee', 'Comfortable jeans, fit true to size.'),
(9, 5, 5, 'Karen Martinez', 'Everything I needed for my garden. Quality tools!'),
(10, 5, 5, 'John Anderson', 'Very happy with this purchase. Durable and well-made.'),
(11, 7, 5, 'Jessica Taylor', 'Perfect thickness and great grip. Highly recommend!'),
(12, 7, 4, 'Chris Moore', 'Good mat but wish it came in more colors.'),
(13, 8, 5, 'Ashley Thompson', 'Most comfortable running shoes I have ever owned!'),
(14, 8, 5, 'Ryan Garcia', 'Great support and very lightweight.'),
(15, 9, 5, 'Michelle Robinson', 'Could not put it down! Excellent plot twists.'),
(16, 10, 4, 'Daniel Clark', 'Recipes are easy to follow and delicious.'),
(17, 11, 5, 'William Scott', 'Picture quality is absolutely stunning! Worth every penny.'),
(18, 11, 5, 'Jennifer Adams', 'Easy to set up and the smart features work great.'),
(19, 11, 4, 'Mark Phillips', 'Great TV, only wish the remote was backlit.'),
(20, 12, 5, 'Sandra Mitchell', 'Amazing sound for such a small speaker. Love it for the pool!'),
(21, 12, 5, 'Greg Thompson', 'Battery lasts forever and it is truly waterproof.'),
(22, 13, 5, 'Angela White', 'Beautiful jacket! The leather quality is exceptional.'),
(23, 13, 4, 'Robert King', 'Stylish and comfortable, runs slightly large.'),
(24, 14, 5, 'Melissa Carter', 'These sneakers are so comfortable and look amazing!'),
(25, 14, 5, 'Jason Turner', 'Best sneakers I have owned. Great quality and unique design.'),
(26, 15, 5, 'Patricia Lewis', 'This vacuum has changed my life! My floors are always clean now.'),
(27, 15, 4, 'Charles Wright', 'Works great but can be a bit noisy on hardwood floors.'),
(28, 16, 5, 'Barbara Hall', 'Noticeable difference in air quality within days. Highly recommend!'),
(29, 16, 5, 'Steven Allen', 'Perfect for my allergies. Very quiet operation.'),
(30, 17, 5, 'Nancy Young', 'Excellent bike for the price. Very smooth ride on trails.'),
(31, 17, 4, 'Kevin Hernandez', 'Good quality bike, assembly was a bit tricky.'),
(32, 18, 5, 'Betty Lopez', 'Spacious and easy to set up. Stayed dry in heavy rain!'),
(33, 18, 5, 'Donald Hill', 'Perfect for family camping trips. Very sturdy.'),
(34, 19, 5, 'Helen Green', 'Love waking up to fresh coffee every morning!'),
(35, 19, 5, 'Paul Baker', 'Makes excellent coffee and the thermal carafe keeps it hot for hours.'),
(36, 20, 5, 'Carol Nelson', 'Boils water super fast and looks great on my counter.'),
(37, 20, 4, 'George Carter', 'Good kettle, wish it had temperature control options.');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `noInStock` int(11) NOT NULL DEFAULT 0,
  `producer` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `isHighlighted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `categoryId`, `price`, `noInStock`, `producer`, `description`, `isHighlighted`) VALUES
(1, 'Wireless Headphones', 1, 79.99, 50, 'SoundTech Pro', 'High-quality wireless headphones with noise cancellation and 30-hour battery life.', 0),
(2, 'Smartphone Stand', 1, 15.99, 120, 'TechGear', 'Adjustable aluminum stand compatible with all smartphone models.', 0),
(3, 'Cotton T-Shirt', 2, 19.99, 200, 'ComfortWear', 'Comfortable 100% cotton t-shirt available in multiple colors.', 0),
(4, 'Denim Jeans', 2, 49.99, 85, 'DenimCo', 'Classic fit denim jeans with stretch fabric for maximum comfort.', 0),
(5, 'Garden Tool Set', 3, 34.99, 45, 'GreenThumb Tools', 'Complete 10-piece garden tool set with carrying case.', 0),
(6, 'Indoor Plant Pot', 3, 12.99, 150, 'HomeGarden Plus', 'Ceramic plant pot with drainage hole and saucer, perfect for small to medium plants.', 0),
(7, 'Yoga Mat', 4, 29.99, 75, 'FitnessPro', 'Non-slip yoga mat with extra cushioning, includes carrying strap.', 0),
(8, 'Running Shoes', 4, 89.99, 60, 'SportMax', 'Lightweight running shoes with breathable mesh and cushioned sole.', 0),
(9, 'Mystery Novel', 5, 14.99, 100, 'Penguin Books', 'Bestselling mystery thriller that will keep you on the edge of your seat.', 0),
(10, 'Cookbook', 5, 24.99, 55, 'Kitchen Publishing', 'Collection of 200 easy and delicious recipes for home cooking.', 0),
(11, '4K Smart TV 55\"', 1, 599.99, 25, 'VisionTech', 'Ultra HD 4K Smart TV with HDR, built-in streaming apps, and voice control. Perfect for your home entertainment.', 1),
(12, 'Bluetooth Speaker', 1, 49.99, 80, 'SoundWave', 'Portable waterproof Bluetooth speaker with 360-degree sound and 12-hour battery life.', 1),
(13, 'Leather Jacket', 2, 149.99, 40, 'StyleCraft', 'Genuine leather jacket with classic design, perfect for any season. Available in black and brown.', 1),
(14, 'Designer Sneakers', 2, 129.99, 55, 'UrbanStep', 'Limited edition designer sneakers with premium materials and unique colorways.', 1),
(15, 'Robot Vacuum Cleaner', 3, 299.99, 30, 'CleanBot Pro', 'Smart robot vacuum with mapping technology, app control, and automatic charging.', 1),
(16, 'Air Purifier', 3, 179.99, 45, 'PureAir', 'HEPA air purifier removes 99.97% of allergens, dust, and pollutants. Quiet operation for bedroom use.', 1),
(17, 'Mountain Bike', 4, 499.99, 20, 'TrailBlazer', 'Professional mountain bike with 21-speed gears, front suspension, and lightweight aluminum frame.', 1),
(18, 'Camping Tent 4-Person', 4, 159.99, 35, 'OutdoorPro', 'Waterproof 4-person camping tent with easy setup, ventilation windows, and carrying bag.', 1),
(19, 'Premium Coffee Maker', 1, 89.99, 65, 'BrewMaster', 'Programmable coffee maker with thermal carafe, brew strength control, and auto shut-off.', 1),
(20, 'Electric Kettle', 3, 39.99, 90, 'QuickBoil', 'Stainless steel electric kettle with rapid boil technology, auto shut-off, and 1.7L capacity.', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blograting`
--
ALTER TABLE `blograting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blogId` (`blogId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productimage`
--
ALTER TABLE `productimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `productqna`
--
ALTER TABLE `productqna`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `productrating`
--
ALTER TABLE `productrating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `blograting`
--
ALTER TABLE `blograting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `productimage`
--
ALTER TABLE `productimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `productqna`
--
ALTER TABLE `productqna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `productrating`
--
ALTER TABLE `productrating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blograting`
--
ALTER TABLE `blograting`
  ADD CONSTRAINT `blograting_ibfk_1` FOREIGN KEY (`blogId`) REFERENCES `blog` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `productimage`
--
ALTER TABLE `productimage`
  ADD CONSTRAINT `productimage_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `productqna`
--
ALTER TABLE `productqna`
  ADD CONSTRAINT `productqna_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `productrating`
--
ALTER TABLE `productrating`
  ADD CONSTRAINT `productrating_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
