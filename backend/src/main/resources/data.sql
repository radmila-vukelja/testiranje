
INSERT INTO `role`(`id`, `type`) VALUES (1, 'ROLE_ADMIN');
INSERT INTO `role`(`id`,`type`) VALUES (2, 'ROLE_USER');

INSERT INTO `user`(`id`, `last_name`,`name`, `password`, `user_name`, `email`) VALUES
 (4, 'admin', 'admin', 'admin', 'admin', 'admin@admin.com');
--INSERT INTO `user_roles`(`user_id`,`role_id`)VALUES(3, 1);
INSERT INTO `user_roles`(`user_id`,`role_id`)VALUES(4, 1);

--kadeticategory
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10101, -47, 'Female', 'Kadet');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10102, -54, 'Female', 'Kadet');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10103, 54, 'Female', 'Kadet');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10104, -52, 'Male', 'Kadet');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10105, -57, 'Male', 'Kadet');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10106, -63, 'Male', 'Kadet');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10107, -70, 'Male', 'Kadet');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10108, 70, 'Male', 'Kadet');

--juniori
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10109, -48, 'Female', 'Junior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10110, -53, 'Female', 'Junior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10111, -59, 'Female', 'Junior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10112, 59, 'Female', 'Junior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10113, -55, 'Male', 'Junior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10114, -61, 'Male', 'Junior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10115, -68, 'Male', 'Junior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10116, -76, 'Male', 'Junior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10117, 76, 'Male', 'Junior');

--mladji seniori
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10118, -50, 'Female', 'Mladji Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10119, -55, 'Female', 'Mladji Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10120, -61, 'Female', 'Mladji Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10121, -68, 'Female', 'Mladji Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10122, 68, 'Female', 'Mladji Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10123, -60, 'Male', 'Mladji Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10124, -67, 'Male', 'Mladji Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10125, -75, 'Male', 'Mladji Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10126, -84, 'Male', 'Mladji Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10127, 84, 'Male', 'Mladji Senior');

-- senori
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10128, -50, 'Female', 'Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10129, -55, 'Female', 'Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10130, -61, 'Female', 'Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10131, -68, 'Female', 'Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10132, 68, 'Female', 'Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10133, -60, 'Male', 'Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10134, -67, 'Male', 'Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10135, -75, 'Male', 'Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10136, -84, 'Male', 'Senior');
INSERT INTO `weight_category`(`id`,`weight`,`gender`, `category`) VALUES(10137, 84, 'Male', 'Senior');


-- lokacije
INSERT INTO `location`(`id`,`name`) VALUES(10138, 'Beograd');
INSERT INTO `location`(`id`,`name`) VALUES(10139, 'Novo Milosevo');
INSERT INTO `location`(`id`,`name`) VALUES(10140, 'Zrenjanin');
INSERT INTO `location`(`id`,`name`) VALUES(10141, 'Kovin');
INSERT INTO `location`(`id`,`name`) VALUES(10142, 'Kragujevac');
INSERT INTO `location`(`id`,`name`) VALUES(10143, 'Krusevac');
INSERT INTO `location`(`id`,`name`) VALUES(10144, 'Pancevo');
INSERT INTO `location`(`id`,`name`) VALUES(10145, 'Smederevo');
INSERT INTO `location`(`id`,`name`) VALUES(10146, 'Subotica');
INSERT INTO `location`(`id`,`name`) VALUES(10147, 'Novi Sad');