CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP 
);

-- Populate table with sample data
INSERT INTO users (username, password, email, created_on)
VALUES ('hello', 'itsme', 'me@me.me', NOW());

INSERT INTO users (username, password, email, created_on)
VALUES ('guest', 'public', 'me2@me.me', NOW());