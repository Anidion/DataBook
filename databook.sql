-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__drizzle_migrations`
--

DROP TABLE IF EXISTS `__drizzle_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__drizzle_migrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `created_at` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__drizzle_migrations`
--

LOCK TABLES `__drizzle_migrations` WRITE;
/*!40000 ALTER TABLE `__drizzle_migrations` DISABLE KEYS */;
INSERT INTO `__drizzle_migrations` VALUES (1,'d0b0aed377d5f8b25a1bf72a6f6720d334d356262ce6ccd3ce1dead96b076e64',1712964597239),(2,'73ec57875e0e4ff948248f4370bcf3ccd93c9763ab6a93d34de6e9e5b015b2f0',1712964968549),(3,'ebd8aa5345d6b61074dcced090dffae90947f8f06ad638c7611f00edf14fa1fb',1713032366419),(4,'b0d0ef19785c30b05bd25e84f7d639f87d5a7d2ea83820ac1607b1b392a65cb0',1713051255013);
/*!40000 ALTER TABLE `__drizzle_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminapproves`
--

DROP TABLE IF EXISTS `adminapproves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminapproves` (
  `admin` bigint unsigned NOT NULL,
  `review` bigint unsigned NOT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin`,`review`),
  KEY `adminapproves_review_review_id_fk` (`review`),
  CONSTRAINT `adminapproves_admin_user_id_fk` FOREIGN KEY (`admin`) REFERENCES `user` (`id`),
  CONSTRAINT `adminapproves_review_review_id_fk` FOREIGN KEY (`review`) REFERENCES `review` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminapproves`
--

LOCK TABLES `adminapproves` WRITE;
/*!40000 ALTER TABLE `adminapproves` DISABLE KEYS */;
INSERT INTO `adminapproves` VALUES (1,2,1,'2024-04-13 19:27:40','2024-04-13 19:27:40'),(1,3,1,'2024-04-13 19:27:40','2024-04-13 19:27:40'),(1,12,1,'2024-04-13 19:27:40','2024-04-13 19:27:40'),(1,13,1,'2024-04-13 19:27:40','2024-04-13 19:27:40'),(1,14,1,'2024-04-13 19:27:40','2024-04-13 19:27:40'),(1,15,0,'2024-04-13 19:27:40','2024-04-13 19:27:40'),(1,16,1,'2024-04-13 19:27:40','2024-04-13 19:27:40');
/*!40000 ALTER TABLE `adminapproves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `bio` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'Andrzej Sapkowski','Polish Author','2024-04-13 19:13:04','2024-04-13 19:13:04'),(2,'Frank Herbert','Author of Dune','2024-04-13 19:13:04','2024-04-13 19:13:04'),(3,'Bill Bryson','American Science Writer\r\n','2024-04-13 19:13:04','2024-04-13 19:13:04'),(4,'Walter Isaacson','Author of Biographies\r\n','2024-04-13 19:13:04','2024-04-13 19:13:04');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `isbn` varchar(13) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `quantity` bigint unsigned DEFAULT NULL,
  `publisher` bigint unsigned DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `coverUrl` varchar(1024) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`isbn`),
  KEY `book_publisher_publisher_id_fk` (`publisher`),
  CONSTRAINT `book_publisher_publisher_id_fk` FOREIGN KEY (`publisher`) REFERENCES `publisher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES ('9780307885159','A short history of nearly everything',1,NULL,'2024-04-13 19:16:09','2024-04-13 19:17:24','https://covers.openlibrary.org/b/isbn/9780307885159-L.jpg',NULL),('9780316029186','The Last Wish',1,NULL,'2024-04-13 19:16:09','2024-04-13 19:17:24','https://covers.openlibrary.org/b/isbn/9780316029186-L.jpg',NULL),('9780425046876','Dune',1,NULL,'2024-04-13 19:16:09','2024-04-13 19:17:24','https://covers.openlibrary.org/b/isbn/9780425046876-L.jpg',NULL),('9787508630069','Steve Jobs: A Biography',1,NULL,'2024-04-13 19:16:09','2024-04-13 19:17:24','https://covers.openlibrary.org/b/isbn/9787508630069-L.jpg',NULL);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookisgenre`
--

DROP TABLE IF EXISTS `bookisgenre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookisgenre` (
  `isbn` varchar(13) NOT NULL,
  `genre` bigint unsigned NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`isbn`,`genre`),
  KEY `bookisgenre_genre_genre_id_fk` (`genre`),
  CONSTRAINT `bookisgenre_genre_genre_id_fk` FOREIGN KEY (`genre`) REFERENCES `genre` (`id`),
  CONSTRAINT `bookisgenre_isbn_book_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `book` (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookisgenre`
--

LOCK TABLES `bookisgenre` WRITE;
/*!40000 ALTER TABLE `bookisgenre` DISABLE KEYS */;
INSERT INTO `bookisgenre` VALUES ('9780307885159',5,'2024-04-13 19:17:45','2024-04-13 19:17:45'),('9780307885159',6,'2024-04-13 19:17:45','2024-04-13 19:17:45'),('9780316029186',2,'2024-04-13 19:17:45','2024-04-13 19:17:45'),('9780316029186',4,'2024-04-13 19:17:45','2024-04-13 19:17:45'),('9780425046876',2,'2024-04-13 19:17:45','2024-04-13 19:17:45'),('9780425046876',3,'2024-04-13 19:17:45','2024-04-13 19:17:45'),('9787508630069',1,'2024-04-13 19:17:45','2024-04-13 19:17:45'),('9787508630069',6,'2024-04-13 19:17:45','2024-04-13 19:17:45');
/*!40000 ALTER TABLE `bookisgenre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Biography','2024-04-13 19:14:01','2024-04-13 19:14:01'),(2,'Fiction','2024-04-13 19:14:01','2024-04-13 19:14:01'),(3,'Sci-Fi','2024-04-13 19:14:01','2024-04-13 19:14:01'),(4,'Fantasy','2024-04-13 19:14:01','2024-04-13 19:14:01'),(5,'Educational','2024-04-13 19:14:01','2024-04-13 19:14:01'),(6,'Non-Fiction','2024-04-13 19:14:01','2024-04-13 19:14:01');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `yearFounded` bigint unsigned DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user` bigint unsigned NOT NULL,
  `isbn` varchar(13) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`user`,`isbn`),
  UNIQUE KEY `id` (`id`),
  KEY `reservation_user_user_id_fk` (`user`),
  KEY `reservation_isbn_book_isbn_fk` (`isbn`),
  CONSTRAINT `reservation_isbn_book_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `book` (`isbn`),
  CONSTRAINT `reservation_user_user_id_fk` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,1,'9780307885159','2024-04-13 19:25:34','2024-04-13 19:25:34'),(2,1,'9780316029186','2024-04-13 19:25:34','2024-04-13 19:25:34'),(3,1,'9780307885159','2024-04-13 19:25:34','2024-04-13 19:25:34'),(4,1,'9780307885159','2024-04-13 19:25:34','2024-04-13 19:25:34');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user` bigint unsigned DEFAULT NULL,
  `isbn` varchar(13) DEFAULT NULL,
  `rating` bigint unsigned DEFAULT NULL,
  `content` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`),
  KEY `review_user_user_id_fk` (`user`),
  KEY `review_isbn_book_isbn_fk` (`isbn`),
  CONSTRAINT `review_isbn_book_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `book` (`isbn`),
  CONSTRAINT `review_user_user_id_fk` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (2,1,'9780316029186',5,'This book is amazing! I loved it so much!','2024-04-13 19:26:04','2024-04-13 19:26:04'),(3,1,'9780316029186',5,'This book is amazing! I loved it so much!','2024-04-13 19:26:04','2024-04-13 19:26:04'),(10,1,'9780316029186',5,'uihjaushbdiklasjfkasbfkasjndj text','2024-04-13 19:26:04','2024-04-13 19:26:04'),(11,1,'9780316029186',4,'WOW!','2024-04-13 19:26:04','2024-04-13 19:26:04'),(12,1,'9780316029186',4,'WOW!','2024-04-13 19:26:04','2024-04-13 19:26:04'),(13,1,'9780316029186',3,'incredible','2024-04-13 19:26:04','2024-04-13 19:26:04'),(14,1,'9780316029186',5,'10 out of 10','2024-04-13 19:26:04','2024-04-13 19:26:04'),(15,1,'9780316029186',4,'4 out of 5','2024-04-13 19:26:04','2024-04-13 19:26:04'),(16,1,'9780316029186',3,'asd','2024-04-13 19:26:04','2024-04-13 19:26:04'),(17,1,'9780425046876',4,'Really good','2024-04-13 19:26:04','2024-04-13 19:26:04'),(18,1,'9787508630069',1,'terrible','2024-04-13 19:26:04','2024-04-13 19:26:04');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user` bigint unsigned NOT NULL,
  `isbn` varchar(13) NOT NULL,
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`user`,`isbn`),
  UNIQUE KEY `id` (`id`),
  KEY `transaction_user_user_id_fk` (`user`),
  KEY `transaction_isbn_book_isbn_fk` (`isbn`),
  CONSTRAINT `transaction_isbn_book_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `book` (`isbn`),
  CONSTRAINT `transaction_user_user_id_fk` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,1,'9780425046876','2024-04-13 19:26:52','2024-04-27 19:26:52','2024-04-13 19:27:12','2024-04-13 19:27:12'),(2,1,'9780425046876','2024-04-13 19:26:52','2024-04-27 19:26:52','2024-04-13 19:27:12','2024-04-13 19:27:12'),(3,1,'9780307885159','2024-04-13 19:26:52','2024-04-27 19:26:52','2024-04-13 19:27:12','2024-04-13 19:27:12'),(4,1,'9787508630069','2024-04-13 19:26:52','2024-04-27 19:26:52','2024-04-13 19:27:12','2024-04-13 19:27:12'),(5,1,'9780307885159','2024-04-13 19:26:52','2024-04-27 19:26:52','2024-04-13 19:27:12','2024-04-13 19:27:12'),(6,1,'9780425046876','2024-04-13 19:26:52','2024-04-27 19:26:52','2024-04-13 19:27:12','2024-04-13 19:27:12');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ben1','$2b$10$F1jg9pZOXQSCxdQkAI6Yt.IbI2xfJE/eQnATDBjR1ufWz32vLshNC','ben@mail.com',1,'2024-04-13 19:14:54','2024-04-13 19:14:54'),(2,'empty','$2b$10$PuCcUJZE9j7Zn3UBfxeGV.CemnzIPOXUyeevy4sfy9asIVnTHmHN2','empty@mail.com',NULL,'2024-04-13 19:14:54','2024-04-13 19:14:54'),(3,'test','$2b$10$hY.VefmVhFjel1JA3xLvWuY8lqkgwi52vYD6HFjAFhQntnUAmxseG','test@gmail.com',NULL,'2024-04-13 19:14:54','2024-04-13 19:14:54'),(4,'demo','$2b$10$SJLaOe23JtvpL21y0aW5i.FJQQkXEpoOUD/HMXUX55t6OBBVRG3/q','demo@mail.com',NULL,'2024-04-13 19:14:54','2024-04-13 19:14:54');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlikes`
--

DROP TABLE IF EXISTS `userlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlikes` (
  `user` bigint unsigned NOT NULL,
  `genre` bigint unsigned NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user`,`genre`),
  KEY `userlikes_genre_genre_id_fk` (`genre`),
  CONSTRAINT `userlikes_genre_genre_id_fk` FOREIGN KEY (`genre`) REFERENCES `genre` (`id`),
  CONSTRAINT `userlikes_user_user_id_fk` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlikes`
--

LOCK TABLES `userlikes` WRITE;
/*!40000 ALTER TABLE `userlikes` DISABLE KEYS */;
INSERT INTO `userlikes` VALUES (1,2,'2024-04-13 19:29:09','2024-04-13 19:29:09');
/*!40000 ALTER TABLE `userlikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `writtenby`
--

DROP TABLE IF EXISTS `writtenby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `writtenby` (
  `isbn` varchar(13) NOT NULL,
  `author` bigint unsigned NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`isbn`,`author`),
  KEY `writtenby_author_author_id_fk` (`author`),
  CONSTRAINT `writtenby_author_author_id_fk` FOREIGN KEY (`author`) REFERENCES `author` (`id`),
  CONSTRAINT `writtenby_isbn_book_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `book` (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `writtenby`
--

LOCK TABLES `writtenby` WRITE;
/*!40000 ALTER TABLE `writtenby` DISABLE KEYS */;
INSERT INTO `writtenby` VALUES ('9780307885159',3,'2024-04-13 19:28:03','2024-04-13 19:28:03'),('9780316029186',1,'2024-04-13 19:28:03','2024-04-13 19:28:03'),('9780425046876',2,'2024-04-13 19:28:03','2024-04-13 19:28:03'),('9787508630069',4,'2024-04-13 19:28:03','2024-04-13 19:28:03');
/*!40000 ALTER TABLE `writtenby` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15 17:22:37
