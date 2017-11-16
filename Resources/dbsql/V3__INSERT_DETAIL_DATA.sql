INSERT INTO driver_detail(driver_id, vehicle_operating_id, create_dt, last_update_dt)
VALUES (1, '1477621', now(), now()),
(2, '18840666', now(), now()),
(3, '1884065', now(), now()),
(4, '95045135', now(), now()),
(5, '95045133', now(), now());

INSERT INTO complaint(driver_id, occur_dt, content, create_dt, last_update_dt)
VALUES (1, now(), '错误1',now(), now()),
(2, now(), '错误2',now(), now()),
(3, now(), '错误3',now(), now()),
(4, now(), '错误4',now(), now()),
(5, now(), '错误5',now(), now());

INSERT INTO accident(driver_id, occur_dt, responsibility_type_id, create_dt, last_update_dt)
VALUES (1, now(), 1, now(), now()),
(2, now(), 1, now(), now()),
(3, now(), 1, now(), now()),
(4, now(), 1, now(), now()),
(5, now(), 1, now(), now());