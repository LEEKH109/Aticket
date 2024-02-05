START TRANSACTION;

INSERT INTO category (category_id, name) VALUES
                                             (1, '전시'),
                                             (2, '뮤지컬'),
                                             (3, '연극');

INSERT INTO art (category_id, title) VALUES
                                         (1, '전시1'),
                                         (1, '전시2'),
                                         (2, '뮤지컬1'),
                                         (2, '뮤지컬2'),
                                         (3, '연극1'),
                                         (3, '연극2');

INSERT INTO timetable (art_id, category_id, date, start_time, end_time, status) VALUES
                                                                                    (1, 1, '2024-02-15', '10:00:00', '12:00:00', 0),
                                                                                    (1, 1, '2024-02-16', '10:00:00', '12:00:00', 0),
                                                                                    (1, 1, '2024-02-18', '10:00:00', '12:00:00', 0),
                                                                                    (1, 1, '2024-02-19', '10:00:00', '12:00:00', 0),
                                                                                    (1, 1, '2024-02-21', '10:00:00', '12:00:00', 0),
                                                                                    (1, 1, '2024-02-24', '10:00:00', '12:00:00', 0),
                                                                                    (1, 1, '2024-02-25', '10:00:00', '12:00:00', 0),
                                                                                    (1, 1, '2024-03-01', '13:00:00', '15:00:00', 0),
                                                                                    (1, 1, '2024-03-02', '10:00:00', '12:00:00', 0),
                                                                                    (2, 1, '2024-03-02', '13:00:00', '15:00:00', 0),
                                                                                    (2, 1, '2024-03-05', '13:00:00', '15:00:00', 0),
                                                                                    (3, 2, '2024-03-28', '13:00:00', '15:00:00', 0),
                                                                                    (4, 2, '2024-03-28', '13:00:00', '15:00:00', 0),
                                                                                    (5, 2, '2024-03-28', '13:00:00', '15:00:00', 0),
                                                                                    (6, 2, '2024-03-28', '13:00:00', '15:00:00', 0);

INSERT INTO ticket_type (timetable_id, user_type, price) VALUES
                                                             (1, '청소년', 12000),
                                                             (1, '성인', 15000),
                                                             (1, '유아', 3000),
                                                             (2, '청소년', 12000),
                                                             (2, '성인', 15000),
                                                             (2, '유아', 3000),
                                                             (3, '청소년', 12000),
                                                             (3, '성인', 15000),
                                                             (3, '유아', 3000),
                                                             (4, '청소년', 9000),
                                                             (4, '성인', 12000),
                                                             (4, '유아', 1000);

INSERT INTO seat (timetable_id, seat_number, status, type, price) VALUES
                                                                      (6, 'A1', '예약가능', 'R석', 50000),
                                                                      (6, 'A2', '예약가능', 'R석', 50000),
                                                                      (6, 'A3', '예약가능', 'R석', 50000),
                                                                      (6, 'A4', '예약가능', 'R석', 50000),
                                                                      (6, 'B1', '예약가능', 'S석', 40000),
                                                                      (6, 'B2', '예약가능', 'S석', 40000),
                                                                      (6, 'B3', '예약가능', 'S석', 40000),
                                                                      (6, 'B4', '예약가능', 'S석', 40000),
                                                                      (7, 'A1', '예약가능', 'R석', 50000),
                                                                      (7, 'A2', '예약가능', 'R석', 50000),
                                                                      (7, 'A3', '예약가능', 'R석', 50000),
                                                                      (7, 'A4', '예약가능', 'R석', 50000),
                                                                      (7, 'B1', '예약가능', 'S석', 40000),
                                                                      (7, 'B2', '예약가능', 'S석', 40000),
                                                                      (7, 'B3', '예약가능', 'S석', 40000),
                                                                      (7, 'B4', '예약가능', 'S석', 40000),
                                                                      (8, 'A1', '예약가능', 'R석', 50000),
                                                                      (8, 'A2', '예약가능', 'R석', 50000),
                                                                      (8, 'A3', '예약가능', 'R석', 50000),
                                                                      (8, 'A4', '예약가능', 'R석', 50000),
                                                                      (8, 'B1', '예약가능', 'S석', 40000),
                                                                      (8, 'B2', '예약가능', 'S석', 40000),
                                                                      (8, 'B3', '예약가능', 'S석', 40000),
                                                                      (8, 'B4', '예약가능', 'S석', 40000),
                                                                      (9, 'A1', '예약가능', 'R석', 50000),
                                                                      (9, 'A2', '예약가능', 'R석', 50000),
                                                                      (9, 'A3', '예약가능', 'R석', 50000),
                                                                      (9, 'A4', '예약가능', 'R석', 50000),
                                                                      (9, 'B1', '예약가능', 'S석', 40000),
                                                                      (9, 'B2', '예약가능', 'S석', 40000),
                                                                      (9, 'B3', '예약가능', 'S석', 40000),
                                                                      (9, 'B4', '예약가능', 'S석', 40000);

COMMIT;

SELECT timetable_id as timetableId, seat_number as seatNumber, status, type, price
FROM seat
WHERE timetable_id = 6;

SELECT ticket_type_id as ticketId, user_type as name, price
FROM ticket_type
WHERE timetable_id = 1;

SELECT t.art_id, c.name as category, t.date
FROM timetable t
         JOIN art a ON t.art_id = a.art_id
         JOIN category c ON a.category_id = c.category_id
WHERE t.timetable_id = 1;

SELECT date
FROM timetable
WHERE art_id = 1
GROUP BY date
HAVING SUM(status = 0) > 0;

SELECT *
FROM category;

SELECT *
FROM art;

SELECT *
FROM timetable;

SELECT *
FROM timetable
WHERE art_id = 1 AND timetable_id = 30;

SELECT a.art_id, a.title as artTitle, t.timetable_id, t.start_time, t.end_time, s.seat_number, s.status
FROM art a
JOIN timetable t ON a.art_id = t.art_id
JOIN seat s ON t.timetable_id = s.timetable_id
WHERE a.art_id = '6' AND t.timetable_id = '9';

SELECT a.art_id, a.title AS artTitle, t.timetable_id, t.start_time, t.end_time, s.seat_number, s.status, s.price
FROM art a
JOIN timetable t ON a.art_id = t.art_id
JOIN seat s ON t.timetable_id = s.timetable_id
WHERE a.art_id = 6 AND t.timetable_id = 9 AND s.seat_number IN ('B1', 'B2', 'B3');

