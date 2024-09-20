-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: backend
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_flower` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_flower` int NOT NULL,
  `comment` varchar(500) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,'Nice flower!','John Doe','john@example.com'),(2,2,'Beautiful','Jane Smith','jane@example.com'),(3,3,'Love it!','Alice Brown','alice@example.com'),(4,4,'Great!','Bob Johnson','bob@example.com'),(5,5,'Amazing colors','Charlie Davis','charlie@example.com'),(6,6,'Smells good','Daniel Evans','daniel@example.com'),(7,7,'Good quality','Emily Wilson','emily@example.com'),(8,8,'Awesome!','Fiona Garcia','fiona@example.com'),(9,9,'Well packed','George Martinez','george@example.com'),(10,10,'Nice arrangement','Hannah Clark','hannah@example.com');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directory`
--

DROP TABLE IF EXISTS `directory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directory`
--

LOCK TABLES `directory` WRITE;
/*!40000 ALTER TABLE `directory` DISABLE KEYS */;
INSERT INTO `directory` VALUES (1,'Roses'),(2,'Tulips'),(3,'Lilies'),(4,'Orchids'),(5,'Sunflowers'),(6,'Daisies'),(7,'Peonies'),(8,'Carnations'),(9,'Irises'),(10,'Chrysanthemums');
/*!40000 ALTER TABLE `directory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flower`
--

DROP TABLE IF EXISTS `flower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flower` (
  `idflower` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `tag` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idflower`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flower`
--

LOCK TABLES `flower` WRITE;
/*!40000 ALTER TABLE `flower` DISABLE KEYS */;
INSERT INTO `flower` VALUES (1,'Rose','10.00','A beautiful red rose','0,1,3,5,'),(2,'Red Rose','10.00','Beautiful red roses','0,1,2,'),(3,'White Tulip','12.50','Elegant white tulips','0,2,3,'),(4,'Yellow Lily','8.00','Bright yellow lilies','0,3,4,'),(5,'Purple Orchid','15.00','Stunning purple orchids','0,4,5,'),(6,'Golden Sunflower','5.00','Vibrant golden sunflowers','0,5,6,'),(7,'Pink Daisy','7.00','Lovely pink daisies','0,6,7,'),(8,'Red Peony','14.00','Luxurious red peonies','0,7,8,'),(9,'White Carnation','9.00','Delicate white carnations','0,8,9,'),(10,'Blue Iris','13.00','Majestic blue irises','0,9,10,'),(11,'Yellow Chrysanthemum','11.00','Sunny yellow chrysanthemums','0,10,1,'),(12,'Rose','10.00','A beautiful red rose','gift');
/*!40000 ALTER TABLE `flower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_flower` int NOT NULL,
  `image_source` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,1,'1'),(2,2,'2'),(3,3,'3'),(4,4,'4'),(5,5,'5'),(6,6,'6'),(7,7,'7'),(8,8,'8'),(9,9,'9'),(10,10,'1'),(11,2,'2'),(12,13,'12');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_flower` int NOT NULL,
  `id_order` varchar(45) NOT NULL,
  `create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quantity` int NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (5,2,2,'1002','2024-09-16 00:06:51',1,12.50,'done'),(6,3,3,'1003','2024-09-16 00:06:51',5,40.00,''),(7,4,4,'1004','2024-09-16 00:06:51',3,45.00,''),(8,5,5,'1005','2024-09-16 00:06:51',4,20.00,''),(9,6,6,'1006','2024-09-16 00:06:51',2,14.00,''),(10,7,7,'1007','2024-09-16 00:06:51',6,84.00,''),(11,8,8,'1008','2024-09-16 00:06:51',1,9.00,''),(12,9,9,'1009','2024-09-16 00:06:51',3,39.00,''),(13,10,10,'1010','2024-09-16 00:06:51',7,77.00,''),(14,1,2,'1726759991268276','2024-09-20 12:04:15',1,10.00,'200'),(15,1,3,'1726759991268276','2024-09-20 12:04:15',0,12.50,'200'),(16,1,7,'1726833919650443','2024-09-20 12:06:04',4,7.00,'200'),(17,1,3,'1726833919650443','2024-09-20 12:06:05',2,12.50,'200');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin@example.com','admin','admin'),(2,'john@example.com','password123','customer'),(3,'jane@example.com','pass456','admin'),(4,'alice@example.com','alice789','customer'),(5,'bob@example.com','bob123','customer'),(6,'charlie@example.com','charlie456','admin'),(7,'daniel@example.com','daniel789','customer'),(8,'emily@example.com','emily123','customer'),(9,'fiona@example.com','fiona456','admin'),(10,'george@example.com','george789','customer'),(11,'hannah@example.com','hannah123','customer');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-20 12:08:46
