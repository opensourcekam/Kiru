CREATE TABLE `User`
(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `firstName` varchar
(255),
  `lastName` varchar
(255),
  `email` varchar
(255) UNIQUE,
  `password` varchar
(255),
  `name` varchar
(255),
  `created_at` timestamp
);

CREATE TABLE `Haiku`
(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `raw` longtext NOT NULL,
  `url` varchar
(255),
  `lineOne` varchar
(255) NOT NULL,
  `lineTwo` varchar
(255) NOT NULL,
  `lineThree` varchar
(255) NOT NULL,
  `valid` boolean NOT NULL,
  `published` boolean NOT NULL,
  `audio` varchar
(255),
  `created_at` varchar
(255)
);

CREATE TABLE `Rap`
(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `raw` longtext NOT NULL,
  `audio` varchar
(255),
  `created_at` varchar
(255),
  `published` boolean NOT NULL
);

CREATE TABLE `Social`
(
  `id` int PRIMARY KEY,
  `published` boolean NOT NULL,
  `instagram` varchar
(255),
  `twitter` varchar
(255),
  `tiktok` varchar
(255),
  `linkedin` varchar
(255),
  `snapchat` varchar
(255)
);

CREATE TABLE `Comments`
(
  `id` integer PRIMARY KEY,
  `rating` tinyint,
  `comment_body` text
);

ALTER TABLE `Social`
ADD FOREIGN KEY
(`id`) REFERENCES `User`
(`id`);

ALTER TABLE `Haiku`
ADD FOREIGN KEY
(`id`) REFERENCES `User`
(`id`);

ALTER TABLE `Rap`
ADD FOREIGN KEY
(`id`) REFERENCES `User`
(`id`);

ALTER TABLE `Comments`
ADD FOREIGN KEY
(`id`) REFERENCES `Haiku`
(`id`);

ALTER TABLE `Comments`
ADD FOREIGN KEY
(`id`) REFERENCES `Rap`
(`id`);
