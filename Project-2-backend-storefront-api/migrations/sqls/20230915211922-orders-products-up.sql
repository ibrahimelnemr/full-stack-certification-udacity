/* Replace with your SQL commands */

CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)

);

INSERT INTO orders_products (order_id, product_id, quantity) VALUES (1,1,1);