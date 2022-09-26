-- CREATE DATABASE IF NOT EXISTS `spt`;
-- USE `spt`;

CREATE TABLE IF NOT EXISTS `admin`(
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `username` varchar(50) NOT NULL,
   `password` varchar(255) NOT NULL,
   `email` varchar(100) NOT NULL,
   PRIMARY KEY(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO admin VALUES (NULL, "admin", "123456", "admin@gmail.com");
INSERT INTO admin VALUES (NULL, "contributor", "123456", "contributor@gmail.com");
