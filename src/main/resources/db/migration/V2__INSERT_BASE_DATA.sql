INSERT INTO codetable(category, name, display_value)
VALUES ('InsureType', 'TypeOne', 'TypeOneDisplay');

INSERT INTO driver(id_no, name, address, phonenumber, create_dt, last_update_dt, car_number)
VALUES (123, '张三', '甘井子', 18840831234, now(), now(), '辽B77889');

INSERT INTO driver(id_no, name, address, phonenumber, create_dt, last_update_dt, car_number)
VALUES (124, '关羽', '甘井子', 18840831235, now(), now(), '辽B77886');

INSERT INTO driver(id_no, name, address, phonenumber, create_dt, last_update_dt, car_number)
VALUES (125, '张飞', '甘井子', 18840831235, now(), now(), '辽B77883');

INSERT INTO driver(id_no, name, address, phonenumber, create_dt, last_update_dt, car_number)
VALUES (224, '曹操', '锦州', 18840831235, now(), now(), '辽B77882');;

INSERT INTO driver(id_no, name, address, phonenumber, create_dt, last_update_dt, car_number)
VALUES (225, '刘备', '沙河口', 18840831235, now(), now(), '辽B77881');

INSERT INTO "authorization"(username, password)
VALUES('admin', '123');