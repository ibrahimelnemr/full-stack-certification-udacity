/* Replace with your SQL commands */

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    password_digest VARCHAR(255)
);

INSERT INTO users (username, firstname, lastname, password_digest) VALUES ('pineapple4290', 'John', 'Smith', 'pineapple');
