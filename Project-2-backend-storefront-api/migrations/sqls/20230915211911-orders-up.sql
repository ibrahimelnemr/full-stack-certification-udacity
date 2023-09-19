/* Replace with your SQL commands */

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO orders (user_id, status)
VALUES (1, 'completed');

