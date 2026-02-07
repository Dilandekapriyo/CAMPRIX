-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2026 at 07:14 PM
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
-- Database: `camprix`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add product', 7, 'add_product'),
(26, 'Can change product', 7, 'change_product'),
(27, 'Can delete product', 7, 'delete_product'),
(28, 'Can view product', 7, 'view_product');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$Cz7ZJA3qq9KUN96IXqwgs1$JTUwoyQCmXcJv1FPIMjtpOUOnTyUtLEiPlOAAi3TS/w=', '2025-12-14 16:49:18.919811', 1, 'CAMPRIX', '', '', 'dilanbibro@gmail.com', 1, 1, '2025-12-14 16:47:40.059949');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(7, 'home', 'product'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-12-14 09:43:21.646850'),
(2, 'auth', '0001_initial', '2025-12-14 09:43:22.073916'),
(3, 'admin', '0001_initial', '2025-12-14 09:43:22.166613'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-12-14 09:43:22.173280'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-12-14 09:43:22.180894'),
(6, 'contenttypes', '0002_remove_content_type_name', '2025-12-14 09:43:22.227824'),
(7, 'auth', '0002_alter_permission_name_max_length', '2025-12-14 09:43:22.277931'),
(8, 'auth', '0003_alter_user_email_max_length', '2025-12-14 09:43:22.289760'),
(9, 'auth', '0004_alter_user_username_opts', '2025-12-14 09:43:22.296355'),
(10, 'auth', '0005_alter_user_last_login_null', '2025-12-14 09:43:22.332409'),
(11, 'auth', '0006_require_contenttypes_0002', '2025-12-14 09:43:22.336375'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2025-12-14 09:43:22.343820'),
(13, 'auth', '0008_alter_user_username_max_length', '2025-12-14 09:43:22.355302'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2025-12-14 09:43:22.366247'),
(15, 'auth', '0010_alter_group_name_max_length', '2025-12-14 09:43:22.377984'),
(16, 'auth', '0011_update_proxy_permissions', '2025-12-14 09:43:22.384890'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2025-12-14 09:43:22.397703'),
(18, 'home', '0001_initial', '2025-12-14 09:43:22.409228'),
(19, 'sessions', '0001_initial', '2025-12-14 09:43:22.435536');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('lmmnpkilrfychvmkqj20341uh472vmto', '.eJxVjMsOwiAQAP9lz4ZAWVrs0Xu_geyyIFUDSR8n47-bJj3odWYybwi0byXsa1rCLDCCgcsvY4rPVA8hD6r3pmKr2zKzOhJ12lVNTdLrdrZ_g0JrgREGnbjHjiRRL8ZFg4hMTIzkfXZo-uw7hzHrZJw4FjuIeKvRXlkbZvh8AffeOEU:1vUpHa:tQpIACqo2UYWNOMFHuG9Nv0v009VkD9gHhn7dvQIzS8', '2025-12-28 16:49:18.923037');

-- --------------------------------------------------------

--
-- Table structure for table `home_product`
--

CREATE TABLE `home_product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(50) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `cat` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_product`
--

INSERT INTO `home_product` (`id`, `name`, `price`, `unit`, `cat`, `created_at`) VALUES
(1, 'Rice (Local)', '850 XAF', 'per kg', 'Food', '2026-01-11 12:19:56'),
(2, 'Gasoline (Premium)', '650 XAF', 'per liter', 'Fuel', '2026-01-11 12:19:56'),
(3, 'Cement (50kg bag)', '4,500 XAF', 'per bag', 'Construction', '2026-01-11 12:19:56'),
(4, 'Cooking Oil', '1,200 XAF', 'per liter', 'Food', '2026-01-11 12:19:56'),
(5, 'Diesel', '620 XAF', 'per liter', 'Fuel', '2026-01-11 12:19:56'),
(6, 'Iron Rods (12mm)', '8,500 XAF', 'per bundle', 'Construction', '2026-01-11 12:19:56'),
(7, 'Bread (Standard)', '200 XAF', 'per loaf', 'Food', '2026-01-11 12:19:56'),
(8, 'Kerosene', '580 XAF', 'per liter', 'Fuel', '2026-01-11 12:19:56'),
(9, 'Paint (Interior)', '3,200 XAF', 'per 4L', 'Construction', '2026-01-11 12:19:56'),
(10, 'Sugar', '750 XAF', 'per kg', 'Food', '2026-01-11 12:19:56'),
(11, 'Rice (Imported)', '1,150 XAF', 'per kg', 'Food', '2026-01-11 12:31:22'),
(12, 'Gasoline (Premium)', '650 XAF', 'per liter', 'Fuel', '2026-01-11 12:31:22'),
(13, 'Cement (50kg bag)', '4,500 XAF', 'per bag', 'Construction', '2026-01-11 12:31:22'),
(14, 'Cooking Oil', '1,200 XAF', 'per liter', 'Food', '2026-01-11 12:31:22'),
(15, 'Diesel', '620 XAF', 'per liter', 'Fuel', '2026-01-11 12:31:22'),
(16, 'Iron Rods (12mm)', '8,500 XAF', 'per bundle', 'Construction', '2026-01-11 12:31:22'),
(17, 'Bread (Standard)', '200 XAF', 'per loaf', 'Food', '2026-01-11 12:31:22'),
(18, 'Kerosene', '580 XAF', 'per liter', 'Fuel', '2026-01-11 12:31:22'),
(19, 'Paint (Interior)', '3,200 XAF', 'per 4L', 'Construction', '2026-01-11 12:31:22'),
(20, 'Sugar', '750 XAF', 'per kg', 'Food', '2026-01-11 12:31:22'),
(21, 'Rice (Local)', '850 XAF', 'per kg', 'Food', '2026-01-25 12:52:01'),
(22, 'Gasoline (Premium)', '650 XAF', 'per liter', 'Fuel', '2026-01-25 12:52:01'),
(23, 'Cement (50kg bag)', '4,500 XAF', 'per bag', 'Construction', '2026-01-25 12:52:01'),
(24, 'Cooking Oil', '1,200 XAF', 'per liter', 'Food', '2026-01-25 12:52:01'),
(25, 'Diesel', '620 XAF', 'per liter', 'Fuel', '2026-01-25 12:52:01'),
(26, 'Iron Rods (12mm)', '8,500 XAF', 'per bundle', 'Construction', '2026-01-25 12:52:01'),
(27, 'Bread (Standard)', '200 XAF', 'per loaf', 'Food', '2026-01-25 12:52:01'),
(28, 'Kerosene', '580 XAF', 'per liter', 'Fuel', '2026-01-25 12:52:01'),
(29, 'Paint (Interior)', '3,200 XAF', 'per 4L', 'Construction', '2026-01-25 12:52:01'),
(30, 'Sugar', '750 XAF', 'per kg', 'Food', '2026-01-25 12:52:01'),
(31, 'Rice (Local)', '850 XAF', 'per kg', 'Food', '2026-01-25 12:52:29'),
(32, 'Gasoline (Premium)', '650 XAF', 'per liter', 'Fuel', '2026-01-25 12:52:29'),
(33, 'Cement (50kg bag)', '4,500 XAF', 'per bag', 'Construction', '2026-01-25 12:52:29'),
(34, 'Cooking Oil', '1,200 XAF', 'per liter', 'Food', '2026-01-25 12:52:29'),
(35, 'Diesel', '620 XAF', 'per liter', 'Fuel', '2026-01-25 12:52:29'),
(36, 'Iron Rods (12mm)', '8,500 XAF', 'per bundle', 'Construction', '2026-01-25 12:52:29'),
(37, 'Bread (Standard)', '200 XAF', 'per loaf', 'Food', '2026-01-25 12:52:29'),
(38, 'Kerosene', '580 XAF', 'per liter', 'Fuel', '2026-01-25 12:52:29'),
(39, 'Paint (Interior)', '3,200 XAF', 'per 4L', 'Construction', '2026-01-25 12:52:29'),
(40, 'Sugar', '750 XAF', 'per kg', 'Food', '2026-01-25 12:52:29'),
(41, 'Rice (Local)', '850 XAF', 'per kg', 'Food', '2026-01-25 13:49:36'),
(42, 'Gasoline (Premium)', '650 XAF', 'per liter', 'Fuel', '2026-01-25 13:49:36'),
(43, 'Cement (50kg bag)', '4,500 XAF', 'per bag', 'Construction', '2026-01-25 13:49:36'),
(44, 'Cooking Oil', '1,200 XAF', 'per liter', 'Food', '2026-01-25 13:49:36'),
(45, 'Diesel', '620 XAF', 'per liter', 'Fuel', '2026-01-25 13:49:36'),
(46, 'Iron Rods (12mm)', '8,500 XAF', 'per bundle', 'Construction', '2026-01-25 13:49:36'),
(47, 'Bread (Standard)', '200 XAF', 'per loaf', 'Food', '2026-01-25 13:49:36'),
(48, 'Kerosene', '580 XAF', 'per liter', 'Fuel', '2026-01-25 13:49:36'),
(49, 'Paint (Interior)', '3,200 XAF', 'per 4L', 'Construction', '2026-01-25 13:49:36'),
(50, 'Sugar', '750 XAF', 'per kg', 'Food', '2026-01-25 13:49:36'),
(51, 'Rice (Local)', '850 XAF', 'per kg', 'Food', '2026-01-25 14:21:32'),
(52, 'Gasoline (Premium)', '650 XAF', 'per liter', 'Fuel', '2026-01-25 14:21:32'),
(53, 'Cement (50kg bag)', '4,500 XAF', 'per bag', 'Construction', '2026-01-25 14:21:32'),
(54, 'Cooking Oil', '1,200 XAF', 'per liter', 'Food', '2026-01-25 14:21:32'),
(55, 'Diesel', '620 XAF', 'per liter', 'Fuel', '2026-01-25 14:21:32'),
(56, 'Iron Rods (12mm)', '8,500 XAF', 'per bundle', 'Construction', '2026-01-25 14:21:32'),
(57, 'Bread (Standard)', '200 XAF', 'per loaf', 'Food', '2026-01-25 14:21:32'),
(58, 'Kerosene', '580 XAF', 'per liter', 'Fuel', '2026-01-25 14:21:32'),
(59, 'Paint (Interior)', '3,200 XAF', 'per 4L', 'Construction', '2026-01-25 14:21:32'),
(60, 'Sugar', '750 XAF', 'per kg', 'Food', '2026-01-25 14:21:32'),
(61, 'Rice (Local)', '850 XAF', 'per kg', 'Food', '2026-01-25 15:37:41'),
(62, 'Gasoline (Premium)', '650 XAF', 'per liter', 'Fuel', '2026-01-25 15:37:41'),
(63, 'Cement (50kg bag)', '4,500 XAF', 'per bag', 'Construction', '2026-01-25 15:37:41'),
(64, 'Cooking Oil', '1,200 XAF', 'per liter', 'Food', '2026-01-25 15:37:41'),
(65, 'Diesel', '620 XAF', 'per liter', 'Fuel', '2026-01-25 15:37:41'),
(66, 'Iron Rods (12mm)', '8,500 XAF', 'per bundle', 'Construction', '2026-01-25 15:37:41'),
(67, 'Bread (Standard)', '200 XAF', 'per loaf', 'Food', '2026-01-25 15:37:41'),
(68, 'Kerosene', '580 XAF', 'per liter', 'Fuel', '2026-01-25 15:37:41'),
(69, 'Paint (Interior)', '3,200 XAF', 'per 4L', 'Construction', '2026-01-25 15:37:41'),
(70, 'Sugar', '750 XAF', 'per kg', 'Food', '2026-01-25 15:37:41'),
(71, 'Rice (Local)', '850 XAF', 'per kg', 'Food', '2026-01-25 15:40:25'),
(72, 'Gasoline (Premium)', '650 XAF', 'per liter', 'Fuel', '2026-01-25 15:40:25'),
(73, 'Cement (50kg bag)', '4,500 XAF', 'per bag', 'Construction', '2026-01-25 15:40:25'),
(74, 'Cooking Oil', '1,200 XAF', 'per liter', 'Food', '2026-01-25 15:40:25'),
(75, 'Diesel', '620 XAF', 'per liter', 'Fuel', '2026-01-25 15:40:25'),
(76, 'Iron Rods (12mm)', '8,500 XAF', 'per bundle', 'Construction', '2026-01-25 15:40:25'),
(77, 'Bread (Standard)', '200 XAF', 'per loaf', 'Food', '2026-01-25 15:40:25'),
(78, 'Kerosene', '580 XAF', 'per liter', 'Fuel', '2026-01-25 15:40:25'),
(79, 'Paint (Interior)', '3,200 XAF', 'per 4L', 'Construction', '2026-01-25 15:40:25'),
(80, 'Sugar', '750 XAF', 'per kg', 'Food', '2026-01-25 15:40:25'),
(81, 'Sugar balls', '50 XAF', 'per ball', 'Food', '2026-02-06 11:05:24');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `user_id`, `product`, `details`, `created_at`) VALUES
(1, 4, 'Rice', 'sold at 1000 xaf per kg here at dirty south', '2026-01-16 16:34:28'),
(2, 4, 'Cooking Gas', 'the  initial gas price  is sold at 12000frs in buea', '2026-01-16 16:43:47'),
(3, 27, 'Sugar balls', 'SELLING AT 2X THE OFFICIAL PRICE', '2026-02-06 11:15:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(50) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `created_at`, `role`) VALUES
(1, 'John Doe', 'john@example.com', NULL, '2026-01-11 12:19:56', 'user'),
(2, 'Jane Smith', 'jane@example.com', NULL, '2026-01-11 12:19:56', 'user'),
(3, 'Bob Johnson', 'bob@example.com', NULL, '2026-01-11 12:19:56', 'user'),
(4, 'tebid joel', 'tebitjoel77@gmail.com', '$2b$10$AaIpR7l4BJHCBLZBaFXP7e.zo1WrOxOtsqZiFmcgYryYW/vw4AXHi', '2026-01-16 16:31:25', 'user'),
(20, 'Admin User', 'admin@example.com', '$2b$10$beFOstUc.f9VAKRD5JJK9.m7IK7k44XZr8OPx8MTW63YsNLccSQMC', '2026-01-25 15:37:41', 'admin'),
(27, 'EL CISCO', 'iamfrancisefem@gmail.com', '$2b$10$JFvYtxKN6DcUtbpLrEbPp.QyINXyBjidhU.4STf8bkUKFbLHlNhvW', '2026-02-06 11:07:42', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `home_product`
--
ALTER TABLE `home_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `home_product`
--
ALTER TABLE `home_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
