CREATE TABLE "codetable"
(
	id bigserial,
	category text NOT NULL,
	name text NOT NULL,
	display_value text NOT NULL,
	is_active boolean DEFAULT true,
	CONSTRAINT codetable_pk PRIMARY KEY(id)
)
;

CREATE TABLE "user"
(
	id bigserial,
	account_id bigint NOT NULL UNIQUE,
	name text NOT NULL,
	user_role_id bigint NOT NULL,

	created_dt timestamp without time zone NOT NULL,
	last_left_dt timestamp without time zone,

	is_active boolean DEFAULT true,

	CONSTRAINT user_pkey PRIMARY KEY (id),
	CONSTRAINT user_role_fk FOREIGN KEY(user_role_id) REFERENCES "codetable"(id)
)
;

CREATE TABLE "authorization"
(
  user_id bigint NOT NULL,
  user_password text NOT NULL,
  
  CONSTRAINT authorization_pkey PRIMARY KEY (user_id),
  CONSTRAINT authorization_fk FOREIGN KEY(user_id) REFERENCES "user"(id)
)
;

CREATE TABLE "car_type"
(
	id bigserial,
	
	name text,
	displacement text,
	engine_type text,
	
	is_active boolean DEFAULT true,
	
	CONSTRAINT car_type_pkey PRIMARY KEY (id)
)
;
CREATE TABLE "driver"
(
	  id bigserial,
	  id_no text,
	  name text NOT NULL,
	  address text,
	  phonenumber text,
	  
	  car_number text NOT NULL UNIQUE,
	  driving_license_path text,
	  vehicle_travel_license_path text,
	  
	  certificate_path text,
	  certificate_dt date,
	  
	  create_dt date NOT NULL,
	  last_update_dt date NOT NULL,
	  is_active boolean DEFAULT true,
	  
	  CONSTRAINT driver_pkey PRIMARY KEY (id),
	  CONSTRAINT driver_id_no_key UNIQUE (id_no, name)
)
;

CREATE TABLE "substitute_driver"
(
	id bigserial PRIMARY KEY,
	driver_id bigint NOT NULL UNIQUE,
	
	id_no text,
	name text,
	address text,
	phonenumber text,
	
	driving_license_path text,
	vehicle_travel_license_path text,

	certificate_path text,
	certificate_dt date,
	
	CONSTRAINT substitute_driver_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
)
;

CREATE TABLE "driver_detail"
(
	id bigserial,
	driver_id bigint NOT NULL UNIQUE,
	
	vehicle_operating_id text NOT NULL,
	vehicle_registration text,
	
	annual_audit DATE,
	substitute_driver_id bigint,
	
	change_car_dt DATE,
	change_car_fee double precision,
	
	is_transfer_ownership boolean DEFAULT false,
	
	-- Insurance
	insurance_photo_path text,
	insurance_start_dt DATE,
	insurance_end_dt DATE,
	insurance_premium double precision,
	insurance_insured_company text,

	-- Contract
	contract_photo_path text,
	contract_start_dt DATE,
	contract_end_dt DATE,
	contract_supplementary text,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,	

	
	CONSTRAINT driver_detail_pkey PRIMARY KEY(id),
	CONSTRAINT driver_detail_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
)
;

CREATE TABLE "complaint"
(
	id bigserial,
	driver_id bigint NOT NULL,
	
	occur_dt DATE NOT NULL,
	content text NOT NULL,
	is_solved boolean DEFAULT false,
	solve_way text,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,
	is_active boolean DEFAULT true,

	CONSTRAINT complaint_pkey PRIMARY KEY(id),
	CONSTRAINT complaint_driver_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
)
;

CREATE TABLE "accident"
(
	id bigserial,
	driver_id bigint NOT NULL,
		
	occur_dt DATE NOT NULL,
	responsibility_type_id text NOT NULL,
	is_insurance_paid boolean DEFAULT false,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,
	is_active boolean DEFAULT true,
	
	CONSTRAINT accident_pkey PRIMARY KEY(id),
	CONSTRAINT accident_driver_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
)
;

CREATE TABLE "civil_dispute"
(
	id bigserial,
	driver_id bigint NOT NULL,
	
	occur_dt DATE NOT NULL,
	content text NOT NULL,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,
	is_active boolean DEFAULT true,
	
	CONSTRAINT civil_dispute_pkey PRIMARY KEY(id),
	CONSTRAINT civil_dispute_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
)
;

CREATE TABLE "charge"
(
	id bigserial,
	driver_id bigint NOT NULL,
	
	occur_dt DATE NOT NULL,
	charge_type text NOT NULL,
	amount double precision NOT NULL,
	invoce_number text,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,
	is_active boolean DEFAULT true,
	
	CONSTRAINT charge_pkey PRIMARY KEY(id),
	CONSTRAINT charge_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
)
;

