-- MySQL dump 10.13  Distrib 8.3.0, for macos12.6 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `about`
--

DROP TABLE IF EXISTS `about`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename_one` varchar(255) NOT NULL,
  `filename_two` varchar(255) NOT NULL,
  `text` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about`
--

LOCK TABLES `about` WRITE;
/*!40000 ALTER TABLE `about` DISABLE KEYS */;
INSERT INTO `about` VALUES (1,'image1-1715073348600.png','image2-1715073348610.png','Многолетний опыт, высококлассные специалисты, профессионализм, экспертность и стремление быть лучшими.\r\n                «Изыскатель плюс» — одна из крупных, изыскательская компания в РТ.\r\n              ООО \"Изыскатель плюс\" имеет огромный опыт выполнения всех видов геодезических, геологических, экологических и гидрометеорологических работ. Мы являемся членом СРО НП \"ВолгаКамИзыскания\". Наша компания имеет собственную аттестованную лабораторию. За время существования на организации мы приобрели огромный опыт, сформировали отличную профессиональную команду.');
/*!40000 ALTER TABLE `about` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultations`
--

DROP TABLE IF EXISTS `consultations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `patronymic` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` varchar(200) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultations`
--

LOCK TABLES `consultations` WRITE;
/*!40000 ALTER TABLE `consultations` DISABLE KEYS */;
INSERT INTO `consultations` VALUES (1,'1','1','1','1','ol27281480@gmail.com','1','Отклонена','28.05.2024  22:42'),(2,'1','1','1','1','ol27281480@gmail.com','1','Отклонена','31.05.2024  14:11');
/*!40000 ALTER TABLE `consultations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `address` varchar(200) NOT NULL,
  `map` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'+7 (986) 921 7433','izyskatelplusalmet@mail.ru','Республика Татарстан, г. Альметьевск, ул. Абдулаева д.2','https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A4035fb596237c119a0b4042f92a57aec10d10773a10118222d17854c46d33c2f&width=100%25&height=400&lang=ru_RU&scroll=true');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service` varchar(100) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `text` varchar(2000) DEFAULT NULL,
  `star` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (1,'Инженерно - геодезические изыскания','1','1',1),(2,'Инженерно - геологические изыскания','2','2',2),(3,'Инженерно - экологические изыскания','3','3',3),(4,'Инженерно - гидрометеоролигические изыскания','4','4',4),(5,'Инженерно - геологические изыскания','5','5',5),(6,'Инженерно - экологические изыскания','6','6',5),(8,'Инженерно - геодезические изыскания','фыфы','фыфы',5);
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objects`
--

DROP TABLE IF EXISTS `objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `text` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objects`
--

LOCK TABLES `objects` WRITE;
/*!40000 ALTER TABLE `objects` DISABLE KEYS */;
INSERT INTO `objects` VALUES (1,'imageObjects-1715807493124.png','Нашей компанией проводились кадастровые и геодезические работы на территории Республики Татарстан.'),(2,'imageObjects-1715807521138.jpg','Подготавливался ввод объектов в эксплуатацию значимых объектов г.Альметьевск'),(3,'imageObjects-1715807559203.png','ЖК \"ОЛИМПИК LIFE\" Г.АЛЬМЕТЬЕВСК'),(4,'imageObjects-1715807588313.png',' ЖК \"РИВЬЕРА LIFE\" Г.АЛЬМЕТЬЕВСК'),(5,'imageObjects-1715807621340.png','КАЗАНСКИЙ СОБОР Г.АЛЬМЕТЬЕВСК'),(6,'imageObjects-1715807644381.png','ПРОСПЕКТ ТУКАЯ Г.АЛЬМЕТЬЕВСК');
/*!40000 ALTER TABLE `objects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pluses`
--

DROP TABLE IF EXISTS `pluses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pluses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `text` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pluses`
--

LOCK TABLES `pluses` WRITE;
/*!40000 ALTER TABLE `pluses` DISABLE KEYS */;
INSERT INTO `pluses` VALUES (3,'imagePluses-1715074330423.png','“Изыскатель плюс“ успешно работающая компания на рынке с 2004 г'),(4,'imagePluses-1715074447953.png','Мы являемся членом СРО НП “ВолгаКамИзыскания“. Наша компания имеет собственную аттестованную лабораторию.'),(5,'imagePluses-1715074476717.png','Наша команда зарекомендовала себя опытными профессионалами и надежными партнерами, способные в минимальные сроки решить вопросы различной сложности.');
/*!40000 ALTER TABLE `pluses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `text` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,'imageService-1714294563275.jpg','Ищите специалистов, которые могут помочь Вам по инженерным изысканиям? Тогда Вы в правильном решении! Оставьте заявку на приобретении услуги, и мы с Вами обязательно свяжемся. ');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `patronymic` varchar(50) NOT NULL,
  `service` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'1','1','1','Инженерно - геодезические изыскания','1','ol27281480@gmail.com','Принята','28.05.2024  22:43'),(2,'1','1','1','Инженерно - геодезические изыскания','+7 (912) 013-82-22','ol27281480@gmail.com','Отклонена','31.05.2024  14:11'),(3,'Денис','Нестеров','Дмитриевич','Инженерно - геологические изыскания','+7 (912) 013-82-22','ol27281480@gmail.com','Принята','31.05.2024  15:25');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_info`
--

DROP TABLE IF EXISTS `services_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_info` (
  `info_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` varchar(2000) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `list` varchar(2000) NOT NULL,
  PRIMARY KEY (`info_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `services_info_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `services_item` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_info`
--

LOCK TABLES `services_info` WRITE;
/*!40000 ALTER TABLE `services_info` DISABLE KEYS */;
INSERT INTO `services_info` VALUES (2,NULL,'Услуга1','Услуга','imageServicesInfo-1717156656890.png','услга','1|2');
/*!40000 ALTER TABLE `services_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_item`
--

DROP TABLE IF EXISTS `services_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_item` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `text` varchar(2000) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_item`
--

LOCK TABLES `services_item` WRITE;
/*!40000 ALTER TABLE `services_item` DISABLE KEYS */;
INSERT INTO `services_item` VALUES (2,'Услуга1','imageServicesTitle-1717156656877.PNG','Услуга');
/*!40000 ALTER TABLE `services_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_list`
--

DROP TABLE IF EXISTS `services_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_list`
--

LOCK TABLES `services_list` WRITE;
/*!40000 ALTER TABLE `services_list` DISABLE KEYS */;
INSERT INTO `services_list` VALUES (2,'Услуга1');
/*!40000 ALTER TABLE `services_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `title`
--

DROP TABLE IF EXISTS `title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `title` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `title`
--

LOCK TABLES `title` WRITE;
/*!40000 ALTER TABLE `title` DISABLE KEYS */;
INSERT INTO `title` VALUES (1,'Изыскатель плюс');
/*!40000 ALTER TABLE `title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `patronymic` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ирина','Нестеров','Дмитривечи','deniska','$2a$10$Dr.0xQzcT./l6jd4x13rD.uKl/3zr46MXVxTVdWC9IdQTvo2oLrNy','ol27281480@gmail.com','Администратор');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-31 16:01:28
