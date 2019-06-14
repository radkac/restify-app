# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.38)
# Database: restify
# Generation Time: 2019-06-13 02:20:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table endpoints
# ------------------------------------------------------------

LOCK TABLES `endpoints` WRITE;
/*!40000 ALTER TABLE `endpoints` DISABLE KEYS */;

INSERT INTO `endpoints` (`id`, `name`, `url`, `creation`, `last_check`, `interval`, `user_id`)
VALUES
	(5,'Yahoo','http://www.yahoo.com','2019-06-12 12:49:05','2019-06-13 04:19:42',5000,2),
	(8,'Google','http://google.com','2019-06-13 03:06:52','2019-06-13 04:19:40',5000,4),
	(13,'Bing','https://bing.com','2019-06-10 19:01:14','2019-06-13 04:19:43',3000,2);

/*!40000 ALTER TABLE `endpoints` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table results
# ------------------------------------------------------------

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;

INSERT INTO `results` (`id`, `last_check`, `http_status`, `payload`, `endpoint_id`)
VALUES
	(1,'2019-06-13 04:12:44',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(2,'2019-06-13 04:12:45',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(4,'2019-06-13 04:12:49',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(5,'2019-06-13 04:12:52',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(7,'2019-06-13 04:12:54',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(8,'2019-06-13 04:12:58',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(10,'2019-06-13 04:13:00',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(11,'2019-06-13 04:13:04',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(13,'2019-06-13 04:13:05',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(14,'2019-06-13 04:13:09',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(16,'2019-06-13 04:13:11',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(17,'2019-06-13 04:13:15',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(19,'2019-06-13 04:13:16',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(20,'2019-06-13 04:13:21',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(21,'2019-06-13 04:13:21',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(23,'2019-06-13 04:13:27',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(24,'2019-06-13 04:13:27',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(26,'2019-06-13 04:13:32',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(27,'2019-06-13 04:13:33',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(29,'2019-06-13 04:13:38',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(30,'2019-06-13 04:13:39',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(32,'2019-06-13 04:13:43',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(33,'2019-06-13 04:13:45',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(35,'2019-06-13 04:13:49',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(36,'2019-06-13 04:13:51',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(38,'2019-06-13 04:13:56',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(39,'2019-06-13 04:13:57',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(41,'2019-06-13 04:14:02',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(42,'2019-06-13 04:14:03',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(44,'2019-06-13 04:14:07',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(45,'2019-06-13 04:14:09',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(47,'2019-06-13 04:14:12',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(48,'2019-06-13 04:14:15',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(50,'2019-06-13 04:14:18',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(51,'2019-06-13 04:14:21',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(53,'2019-06-13 04:14:23',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(54,'2019-06-13 04:14:27',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(56,'2019-06-13 04:14:28',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(57,'2019-06-13 04:14:34',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(59,'2019-06-13 04:14:34',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(60,'2019-06-13 04:14:39',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(62,'2019-06-13 04:14:40',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(63,'2019-06-13 04:14:44',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(65,'2019-06-13 04:14:46',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(66,'2019-06-13 04:14:50',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(68,'2019-06-13 04:14:52',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(69,'2019-06-13 04:14:55',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(70,'2019-06-13 04:15:01',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(72,'2019-06-13 04:15:01',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(73,'2019-06-13 04:15:06',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(75,'2019-06-13 04:15:07',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(76,'2019-06-13 04:15:11',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(78,'2019-06-13 04:15:13',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(79,'2019-06-13 04:15:17',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(81,'2019-06-13 04:15:19',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(82,'2019-06-13 04:15:22',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(84,'2019-06-13 04:15:25',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(85,'2019-06-13 04:15:27',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(87,'2019-06-13 04:15:31',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(88,'2019-06-13 04:15:33',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(89,'2019-06-13 04:15:37',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(91,'2019-06-13 04:15:38',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(92,'2019-06-13 04:15:43',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(94,'2019-06-13 04:15:44',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(95,'2019-06-13 04:15:49',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(97,'2019-06-13 04:15:51',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(98,'2019-06-13 04:15:55',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(100,'2019-06-13 04:15:57',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(101,'2019-06-13 04:16:21',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(102,'2019-06-13 04:16:21',200,'<!DOCTYPE html><html lang=\"cs\"><script type=\"text/javascript\" >//<![CDATA[\r\nsi_ST=new Date\r\n//]]></script><head><link id=\"bgLink\" rel=\"preload\" href=\"/th?id=OHR.SainteVictoireCezanneBirthday_ROW8534993298_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid',13),
	(103,'2019-06-13 04:16:22',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(104,'2019-06-13 04:16:25',200,'<!DOCTYPE html><html lang=\"cs\"><script type=\"text/javascript\" >//<![CDATA[\r\nsi_ST=new Date\r\n//]]></script><head><link id=\"bgLink\" rel=\"preload\" href=\"/th?id=OHR.SainteVictoireCezanneBirthday_ROW8534993298_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid',13),
	(105,'2019-06-13 04:16:26',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(106,'2019-06-13 04:16:28',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(107,'2019-06-13 04:16:29',200,'<!DOCTYPE html><html lang=\"cs\"><script type=\"text/javascript\" >//<![CDATA[\r\nsi_ST=new Date\r\n//]]></script><head><link id=\"bgLink\" rel=\"preload\" href=\"/th?id=OHR.SainteVictoireCezanneBirthday_ROW8534993298_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid',13),
	(108,'2019-06-13 04:19:24',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(109,'2019-06-13 04:19:24',200,'<!DOCTYPE html><html lang=\"cs\"><script type=\"text/javascript\" >//<![CDATA[\r\nsi_ST=new Date\r\n//]]></script><head><link id=\"bgLink\" rel=\"preload\" href=\"/th?id=OHR.SainteVictoireCezanneBirthday_ROW8534993298_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid',13),
	(110,'2019-06-13 04:19:24',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(111,'2019-06-13 04:19:28',200,'<!DOCTYPE html><html lang=\"cs\"><script type=\"text/javascript\" >//<![CDATA[\r\nsi_ST=new Date\r\n//]]></script><head><link id=\"bgLink\" rel=\"preload\" href=\"/th?id=OHR.SainteVictoireCezanneBirthday_ROW8534993298_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid',13),
	(112,'2019-06-13 04:19:29',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(113,'2019-06-13 04:19:30',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(114,'2019-06-13 04:19:32',200,'<!DOCTYPE html><html lang=\"cs\"><script type=\"text/javascript\" >//<![CDATA[\r\nsi_ST=new Date\r\n//]]></script><head><link id=\"bgLink\" rel=\"preload\" href=\"/th?id=OHR.SainteVictoireCezanneBirthday_ROW8534993298_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid',13),
	(115,'2019-06-13 04:19:34',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(116,'2019-06-13 04:19:35',200,'<!DOCTYPE html><html lang=\"cs\"><script type=\"text/javascript\" >//<![CDATA[\r\nsi_ST=new Date\r\n//]]></script><head><link id=\"bgLink\" rel=\"preload\" href=\"/th?id=OHR.SainteVictoireCezanneBirthday_ROW8534993298_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid',13),
	(117,'2019-06-13 04:19:36',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(118,'2019-06-13 04:19:39',200,'<!DOCTYPE html><html lang=\"cs\"><script type=\"text/javascript\" >//<![CDATA[\r\nsi_ST=new Date\r\n//]]></script><head><link id=\"bgLink\" rel=\"preload\" href=\"/th?id=OHR.SainteVictoireCezanneBirthday_ROW8534993298_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid',13),
	(119,'2019-06-13 04:19:40',200,'<!doctype html><html itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"cs\"><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\"><meta content=\"/images/branding/googleg/1x/googleg_standard_color_128dp.png\" itemprop=\"image\"><title>',8),
	(120,'2019-06-13 04:19:42',200,'�\0\0\0\0\0\0\0Ľ{w�8���~\nM��l2c�$�eO��$Nw<;N��L���CI��X5\"e[��~\0@UQR2s��;���U�P(@���?��}y���U禘�~������z�<=�����\'ɢ�����h�yE��7�(��狼3�f�s���*�yg����w��\Z��q2�׳�3Oiw}����4�OV�U:�):�}�i�Eq۽O�IgV�:�$�-�e��wx[���,�\'��7��?�G���<)b�y7��:����?��w_f�',5),
	(121,'2019-06-13 04:19:43',200,'<!DOCTYPE html><html lang=\"cs\"><script type=\"text/javascript\" >//<![CDATA[\r\nsi_ST=new Date\r\n//]]></script><head><link id=\"bgLink\" rel=\"preload\" href=\"/th?id=OHR.SainteVictoireCezanneBirthday_ROW8534993298_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid',13);

/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `username`, `access_token`)
VALUES
	(2,'neni@je.cz','Je','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ'),
	(3,'nekdo@gmail.com','Nekdo','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fyJ'),
	(4,'testovac@seznam.cz','Testovac','6e017b5464f820a6c1bb5e9f6d711a667a80d8ea');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
