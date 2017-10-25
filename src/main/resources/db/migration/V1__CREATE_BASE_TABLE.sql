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
	  id_no text NOT NULL,
	  name text NOT NULL,
	  address text,
	  phonenumber text,
	  
	  driving_license_path text,
	  vehicle_travel_license_path text,
	  
	  certificate_path text,
	  certificate_dt date,
	  
	  create_dt date NOT NULL,
	  last_update_dt date NOT NULL,
	  is_active boolean DEFAULT true,
	  
	  CONSTRAINT driver_pkey PRIMARY KEY (id),
	  CONSTRAINT driver_id_no_key UNIQUE (id_no)
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
	
	is_transfer_ownership boolean,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,	
	
	CONSTRAINT driver_detail_pkey PRIMARY KEY(id),
	CONSTRAINT driver_detail_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id)
)
;

CREATE TABLE "insurance"
(
	id bigserial,
	driver_id bigint NOT NULL UNIQUE,
	
	photo_path text,
	occur_dt DATE NOT NULL,
	premium double precision NOT NULL,
	insured_company text NOT NULL,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,
	
	CONSTRAINT driver_insurance_pkey PRIMARY KEY(id),
	CONSTRAINT driver_insurance_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id)
)
;

CREATE TABLE "contract"
(
	id bigserial,
	driver_id bigint NOT NULL UNIQUE,
	
	photo_path text,
	start_dt DATE NOT NULL,
	end_dt DATE NOT NULL,
	supplementary text,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,
	
	CONSTRAINT driver_contract_pkey PRIMARY KEY(id),
	CONSTRAINT driver_contract_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id)	
)
;

CREATE TABLE "complaint"
(
	id bigserial,
	driver_id bigint NOT NULL UNIQUE,
	
	occur_dt DATE NOT NULL,
	content text NOT NULL,
	is_solved boolean NOT NULL,
	solve_way text,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,
	is_active boolean DEFAULT true,

	CONSTRAINT complaint_pkey PRIMARY KEY(id),
	CONSTRAINT complaint_driver_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id)
)
;

CREATE TABLE "accident"
(
	id bigserial,
	driver_id bigint NOT NULL UNIQUE,
		
	occur_dt DATE NOT NULL,
	responsibility_type_id bigint NOT NULL,
	is_insurance_paid boolean NOT NULL,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,
	is_active boolean DEFAULT true,
	
	CONSTRAINT accident_pkey PRIMARY KEY(id),
	CONSTRAINT accident_type_fk FOREIGN KEY(responsibility_type_id) REFERENCES "codetable"(id),
	CONSTRAINT accident_driver_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id)
)
;

CREATE TABLE "civil_dispute"
(
	id bigserial,
	driver_id bigint NOT NULL UNIQUE,
	
	occur_dt DATE NOT NULL,
	content text NOT NULL,
	
	create_dt DATE NOT NULL,
	last_update_dt DATE NOT NULL,
	is_active boolean DEFAULT true,
	
	CONSTRAINT civil_dispute_pkey PRIMARY KEY(id),
	CONSTRAINT civil_dispute_fk FOREIGN KEY(driver_id) REFERENCES "driver"(id)	
)
;


