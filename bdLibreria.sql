-- MariaDB dump 10.17  Distrib 10.5.4-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: libreria
-- ------------------------------------------------------
-- Server version	10.5.4-MariaDB-1:10.5.4+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autor`
--

DROP TABLE IF EXISTS `autor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `autor` (
  `COD` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `NOMBRE` varchar(60) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`COD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autor`
--

LOCK TABLES `autor` WRITE;
/*!40000 ALTER TABLE `autor` DISABLE KEYS */;
INSERT INTO `autor` VALUES ('1','Cervantes'),('2','Perez Reverte'),('3','Umberto Eco'),('4','Tolkin');
/*!40000 ALTER TABLE `autor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ejemplares`
--

DROP TABLE IF EXISTS `ejemplares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ejemplares` (
  `COD` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `PASILLO` int(11) DEFAULT NULL,
  `ESTANTERIA` int(11) DEFAULT NULL,
  `ESTANTE` int(11) DEFAULT NULL,
  `CAJON` int(11) DEFAULT NULL,
  `CODLIB` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`COD`),
  UNIQUE KEY `UK_LOC` (`PASILLO`,`ESTANTERIA`,`ESTANTE`,`CAJON`),
  KEY `FK_EJEMPLAR_LIBRO` (`CODLIB`),
  CONSTRAINT `FK_EJEMPLAR_LIBRO` FOREIGN KEY (`CODLIB`) REFERENCES `libros` (`COD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejemplares`
--

LOCK TABLES `ejemplares` WRITE;
/*!40000 ALTER TABLE `ejemplares` DISABLE KEYS */;
INSERT INTO `ejemplares` VALUES ('B1',1,1,1,1,'X1'),('D21',3,1,1,1,'Z1'),('L2',1,1,2,1,'B3'),('L3',1,1,2,2,'B3'),('L4',1,1,2,3,'B3'),('V31',2,4,1,1,'C4');
/*!40000 ALTER TABLE `ejemplares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `libros` (
  `COD` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `ISBN` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `TITULO` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `PRECIO` int(11) DEFAULT NULL,
  `IMAGEN` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `URL` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `COD_AUTOR` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ACTIVO` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`COD`),
  UNIQUE KEY `UK_ISBN_LIB` (`ISBN`),
  KEY `FK_LIBROS_AUTOR` (`COD_AUTOR`),
  CONSTRAINT `FK_LIBROS_AUTOR` FOREIGN KEY (`COD_AUTOR`) REFERENCES `autor` (`COD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES ('B3','444A','El Nombre de la Rosa',45,'elNombreDeLaRosa.jpg','https://www.megustaleer.com/libros/el-nombre-de-la-rosa/MES-003232','3',1),('C4','555A','El Señor de los Anillos',70,'elSenorDeLosAnillos.jpg',NULL,'4',0),('J1','1234','Libro Node.js',10,'nodeJs.jpg',NULL,NULL,1),('X1','111A','El Quijote',90,'donQuijoteDeLaMancha.jpg',NULL,'1',1),('Z1','222B','Capitan Alatriste',50,'elCapitanAlatriste.jpg','https://www.iberlibro.com/servlet/BookDetailsPL?bi=22584861137','2',0);
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestar`
--

DROP TABLE IF EXISTS `prestar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prestar` (
  `CODUSU` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `CODEJEM` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `FECHAPREST` date NOT NULL,
  `FECHADEV` date DEFAULT NULL,
  PRIMARY KEY (`CODUSU`,`CODEJEM`,`FECHAPREST`),
  KEY `FK_PRESTAR_EJEMPLAR` (`CODEJEM`),
  CONSTRAINT `FK_PRESTAR_EJEMPLAR` FOREIGN KEY (`CODEJEM`) REFERENCES `ejemplares` (`COD`),
  CONSTRAINT `FK_PRESTAR_USUARIO` FOREIGN KEY (`CODUSU`) REFERENCES `usuarios` (`COD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestar`
--

LOCK TABLES `prestar` WRITE;
/*!40000 ALTER TABLE `prestar` DISABLE KEYS */;
INSERT INTO `prestar` VALUES ('1','B1','2020-02-01',NULL),('1','D21','2020-02-01',NULL),('1','L2','2020-02-01',NULL),('1','L3','2020-02-01',NULL),('1','L4','2020-02-01',NULL),('1','V31','2020-02-01',NULL),('2','B1','2020-02-01',NULL),('2','D21','2020-02-01',NULL),('2','L2','2020-02-01',NULL),('2','L3','2020-02-01',NULL),('2','L4','2020-02-01',NULL),('2','V31','2020-02-01',NULL),('3','B1','2020-02-01',NULL),('3','D21','2020-02-01',NULL),('3','L2','2020-02-01',NULL),('3','L3','2020-02-01',NULL),('3','L4','2020-02-01',NULL),('3','V31','2020-02-01',NULL),('4','B1','2020-02-01',NULL),('4','D21','2020-02-01',NULL),('4','L2','2020-02-01',NULL),('4','L3','2020-02-01',NULL),('4','L4','2020-02-01',NULL),('4','V31','2020-02-01',NULL),('5','B1','2020-02-01',NULL),('5','D21','2020-02-01',NULL),('5','L2','2020-02-01',NULL),('5','L3','2020-02-01',NULL),('5','L4','2020-02-01',NULL),('5','V31','2020-02-01',NULL),('6','B1','2020-02-01',NULL),('6','D21','2020-02-01',NULL),('6','L2','2020-02-01',NULL),('6','L3','2020-02-01',NULL),('6','L4','2020-02-01',NULL),('6','V31','2020-02-01',NULL),('7','B1','2020-02-01',NULL),('7','D21','2020-02-01',NULL),('7','L2','2020-02-01',NULL),('7','L3','2020-02-01',NULL),('7','L4','2020-02-01',NULL),('7','V31','2020-02-01',NULL),('8','B1','2020-02-01',NULL),('8','D21','2020-02-01',NULL),('8','L2','2020-02-01',NULL),('8','L3','2020-02-01',NULL),('8','L4','2020-02-01',NULL),('8','V31','2020-02-01',NULL);
/*!40000 ALTER TABLE `prestar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `COD` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `NOMBRE` varchar(60) COLLATE utf8_spanish_ci DEFAULT NULL,
  `DIRECCION` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `TELEFONO` int(11) DEFAULT NULL,
  PRIMARY KEY (`COD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('1','PABLO','C/ALAMO 5',NULL),('2','DIEGO','C/ÁRBOL 15',NULL),('3','JAVI','C/FIGUERAS 2',NULL),('4','PILAR','C/SAN VICENTE 30',NULL),('5','NÉSTOR','C/LA VIRGEN 3',444),('6','CAROL','C/GUARIDA 23',333),('7','VICTOR','C/GUARIDA 23',222),('8','MARU','C/LA HIGUERA 20',111);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-15  9:37:24
