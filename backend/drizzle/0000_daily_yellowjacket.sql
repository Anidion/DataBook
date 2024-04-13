CREATE TABLE `adminapproves` (
	`admin` bigint unsigned NOT NULL,
	`review` bigint unsigned NOT NULL,
	`approved` boolean,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `adminapproves_admin_review_pk` PRIMARY KEY(`admin`,`review`)
);
--> statement-breakpoint
CREATE TABLE `author` (
	`id` serial AUTO_INCREMENT,
	`name` varchar(255),
	`bio` text,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `book` (
	`isbn` varchar(13) NOT NULL,
	`title` varchar(255),
	`quantity` bigint unsigned,
	`publisher` bigint unsigned,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `book_isbn` PRIMARY KEY(`isbn`)
);
--> statement-breakpoint
CREATE TABLE `bookisgenre` (
	`isbn` varchar(13) NOT NULL,
	`genre` bigint unsigned NOT NULL,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookisgenre_isbn_genre_pk` PRIMARY KEY(`isbn`,`genre`)
);
--> statement-breakpoint
CREATE TABLE `genre` (
	`id` serial AUTO_INCREMENT,
	`name` varchar(255),
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `publisher` (
	`id` serial AUTO_INCREMENT,
	`name` varchar(255),
	`yearFounded` bigint unsigned,
	`location` varchar(255),
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `reservation` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user` bigint unsigned NOT NULL,
	`isbn` varchar(13) NOT NULL,
	`startdate` datetime,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reservation_id_user_isbn_pk` PRIMARY KEY(`id`,`user`,`isbn`)
);
--> statement-breakpoint
CREATE TABLE `review` (
	`id` serial AUTO_INCREMENT,
	`user` bigint unsigned,
	`isbn` varchar(13),
	`rating` bigint unsigned,
	`content` text,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user` bigint unsigned NOT NULL,
	`isbn` varchar(13) NOT NULL,
	`startdate` datetime,
	`enddate` datetime,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transaction_id_user_isbn_pk` PRIMARY KEY(`id`,`user`,`isbn`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT,
	`username` varchar(255),
	`password` varchar(255),
	`email` varchar(255),
	`isAdmin` boolean,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `userlikes` (
	`user` bigint unsigned NOT NULL,
	`genre` bigint unsigned NOT NULL,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userlikes_user_genre_pk` PRIMARY KEY(`user`,`genre`)
);
--> statement-breakpoint
CREATE TABLE `writtenby` (
	`isbn` varchar(13) NOT NULL,
	`author` bigint unsigned NOT NULL,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `writtenby_isbn_author_pk` PRIMARY KEY(`isbn`,`author`)
);
--> statement-breakpoint
ALTER TABLE `adminapproves` ADD CONSTRAINT `adminapproves_admin_user_id_fk` FOREIGN KEY (`admin`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `adminapproves` ADD CONSTRAINT `adminapproves_review_review_id_fk` FOREIGN KEY (`review`) REFERENCES `review`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `book` ADD CONSTRAINT `book_publisher_publisher_id_fk` FOREIGN KEY (`publisher`) REFERENCES `publisher`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bookisgenre` ADD CONSTRAINT `bookisgenre_isbn_book_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `book`(`isbn`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bookisgenre` ADD CONSTRAINT `bookisgenre_genre_genre_id_fk` FOREIGN KEY (`genre`) REFERENCES `genre`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_user_user_id_fk` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_isbn_book_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `book`(`isbn`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `review` ADD CONSTRAINT `review_user_user_id_fk` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `review` ADD CONSTRAINT `review_isbn_book_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `book`(`isbn`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_user_user_id_fk` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_isbn_book_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `book`(`isbn`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userlikes` ADD CONSTRAINT `userlikes_user_user_id_fk` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userlikes` ADD CONSTRAINT `userlikes_genre_genre_id_fk` FOREIGN KEY (`genre`) REFERENCES `genre`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `writtenby` ADD CONSTRAINT `writtenby_isbn_book_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `book`(`isbn`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `writtenby` ADD CONSTRAINT `writtenby_author_author_id_fk` FOREIGN KEY (`author`) REFERENCES `author`(`id`) ON DELETE no action ON UPDATE no action;