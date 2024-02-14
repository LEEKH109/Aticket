CREATE DATABASE IF NOT EXISTS vendor;
USE vendor;

CREATE TABLE IF NOT EXISTS `art` (
                                     `art_id` int NOT NULL AUTO_INCREMENT,
                                     `category_id` int NOT NULL,
                                     `title` varchar(255) NOT NULL,
                                     PRIMARY KEY (`art_id`)
);

CREATE TABLE IF NOT EXISTS `category` (
                                          `category_id` int NOT NULL AUTO_INCREMENT,
                                          `name` ENUM('전시', '뮤지컬', '연극') NOT NULL,
                                          PRIMARY KEY (`category_id`)
);

CREATE TABLE IF NOT EXISTS `timetable` (
                                           `timetable_id` int NOT NULL AUTO_INCREMENT,
                                           `art_id` int NOT NULL,
                                           `category_id` int NOT NULL,
                                           `date` varchar(50) NOT NULL,
                                           `start_time` Time NOT NULL,
                                           `end_time` Time NOT NULL,
                                           `status` boolean NOT NULL,
                                           PRIMARY KEY (`timetable_id`)
);

CREATE TABLE IF NOT EXISTS `ticket_type` (
                                             `ticket_type_id` int NOT NULL AUTO_INCREMENT,
                                             `timetable_id` int NOT NULL,
                                             `user_type` varchar(50) NOT NULL,
                                             `price` int NOT NULL,
                                             PRIMARY KEY (`ticket_type_id`)
);

CREATE TABLE IF NOT EXISTS `seat` (
                                      `timetable_id` int NOT NULL,
                                      `seat_number` varchar(30) NOT NULL COMMENT '좌석 명 ex) A8',
                                      `status` ENUM('예약가능', '예약중', '예약완료') NOT NULL,
                                      `type` varchar(30) NOT NULL COMMENT '좌석 타입 ex) R석',
                                      `price` int NOT NULL,
                                      PRIMARY KEY (`timetable_id`, `seat_number`)
);

CREATE TABLE IF NOT EXISTS `billing` (
                                         `billing_id` int NOT NULL AUTO_INCREMENT,
                                         `art_id` int NOT NULL,
                                         `reservation_id` varchar(255) NOT NULL COMMENT '가맹점에서 생성한 주문번호',
                                         `booker_name` varchar(255) NOT NULL,
                                         `status` ENUM('PAYMENT_CREATED', 'PAYMENT_PENDING', 'PAYMENT_IN_PROGRESS', 'PAYMENT_COMPLETED', 'PAYMENT_FAILED', 'PAYMENT_CANCELLED') NOT NULL,
                                         `category` VARCHAR(255) NOT NULL,
                                         `tid` varchar(100) NULL COMMENT '카카오에서 생성하는 결제 고유 번호',
                                         `pg_token` varchar(255) NULL COMMENT '결제 준비 완료시에 카카오에서 전달해주는 pg사 고유값',
                                         `total_amount` int NOT NULL,
                                         `reservation_confirmation_date_time` Date NULL,
                                         PRIMARY KEY (`billing_id`, `art_id`)
);

CREATE TABLE IF NOT EXISTS `billing_detail` (
                                                `billing_detail_id` int NOT NULL AUTO_INCREMENT,
                                                `billing_id` int NOT NULL,
                                                `timetable_id` int NOT NULL,
                                                `ticket_type_id` int NULL,
                                                `seat_timetable_id` int NULL,
                                                `seat_number` varchar(30) NULL,
                                                `count` int NOT NULL DEFAULT 1 COMMENT '티켓 종류일 때 사용',
                                                PRIMARY KEY (`billing_detail_id`, `billing_id`)
);

-- 외래키 제약 조건 추가
ALTER TABLE `art`
    ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

ALTER TABLE `timetable`
    ADD FOREIGN KEY (`art_id`) REFERENCES `art` (`art_id`),
    ADD FOREIGN KEY (`category_id`) REFERENCES `art` (`category_id`);

ALTER TABLE `ticket_type`
    ADD FOREIGN KEY (`timetable_id`) REFERENCES `timetable` (`timetable_id`);

ALTER TABLE `seat`
    ADD FOREIGN KEY (`timetable_id`) REFERENCES `timetable` (`timetable_id`);

ALTER TABLE `billing`
    ADD FOREIGN KEY (`art_id`) REFERENCES `art` (`art_id`);

ALTER TABLE `billing_detail`
    ADD FOREIGN KEY (`billing_id`) REFERENCES `billing` (`billing_id`),
    ADD FOREIGN KEY (`timetable_id`) REFERENCES `timetable` (`timetable_id`),
    ADD FOREIGN KEY (`ticket_type_id`) REFERENCES `ticket_type` (`ticket_type_id`),
    ADD FOREIGN KEY (`seat_timetable_id`, `seat_number`) REFERENCES `seat` (`timetable_id`, `seat_number`);
