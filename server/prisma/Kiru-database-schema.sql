CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `password` varchar(255),
  `full_name` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `poems` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `raw` varchar(255),
  `created_at` varchar(255)
);

CREATE TABLE `socials` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `instagram` varchar(255),
  `twitter` varchar(255),
  `tiktok` varchar(255),
  `linkedin` varchar(255),
  `snapchat` varchar(255)
);

ALTER TABLE `poems` ADD FOREIGN KEY (`id`) REFERENCES `user` (`id`);

ALTER TABLE `socials` ADD FOREIGN KEY (`id`) REFERENCES `user` (`id`);
