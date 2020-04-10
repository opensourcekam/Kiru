CREATE TABLE `user`
(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `firstName` varchar
(255),
  `lastName` varchar
(255),
  `password` varchar
(255),
  `full_name` varchar
(255),
  `created_at` timestamp
);

CREATE TABLE `poems`
(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` enum
('HAIKU','RAP'),
  `created_at` varchar
(255)
);

CREATE TABLE `haiku`
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
  `audio` varchar
(255),
  `created_at` varchar
(255)
);

CREATE TABLE `rap`
(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `raw` longtext NOT NULL,
  `audio` varchar
(255),
  `created_at` varchar
(255)
);

CREATE TABLE `socials`
(
  `id` int PRIMARY KEY,
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

CREATE TABLE `comments`
(
  `id` integer PRIMARY KEY,
  `rating` tinyint,
  `comment_body` text
);

ALTER TABLE `poems`
ADD FOREIGN KEY
(`id`) REFERENCES `user`
(`id`);

ALTER TABLE `socials`
ADD FOREIGN KEY
(`id`) REFERENCES `user`
(`id`);

ALTER TABLE `haiku`
ADD FOREIGN KEY
(`id`) REFERENCES `poems`
(`id`);

ALTER TABLE `rap`
ADD FOREIGN KEY
(`id`) REFERENCES `poems`
(`id`);

ALTER TABLE `comments`
ADD FOREIGN KEY
(`id`) REFERENCES `poems`
(`id`);
