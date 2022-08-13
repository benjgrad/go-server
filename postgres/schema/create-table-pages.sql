CREATE TABLE pages (
	page_id serial PRIMARY KEY,
	name VARCHAR(50),
    user_id serial,
	data JSON,
    CONSTRAINT UC_pages_name_userid UNIQUE (name, user_id)
);