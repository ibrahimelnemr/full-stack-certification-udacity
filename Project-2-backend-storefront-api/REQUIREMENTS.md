# API Route Information

**Products**

- Index: (GET) `/products/`

- Show: (GET)`/products/:id` 

- Create: (POST)`/products/` (Token required)

**Users**

- Show: (GET) `/users/:id` (Token required)

- Create: (POST) `/users` (Token required)

- Index: (GET) `/users` (Token required)

- Authenticate: (POST) `/users/authenticate` (Token required)

**Orders**

- Index: (GET) `/users` (Token required)

- Show: (GET)`/users/:id` (Token required)

- Create: (POST)`/users` (Token required)

**Order Products**

- Index: (GET) `/ordersproducts` (Token required)

- Show: (GET)`/ordersproducts/:order_id` (Token required)

- Create: (POST)`/ordersproducts` (Token required)


# Database Creation Schema

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL

);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password_digest VARCHAR(255)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)

);

# Data Shapes

Product
- id: number
- name: string
- price: number

User
- id: number
- username: string
- firstname: string
- lastname: string
- password_digest: string

Orders
- id: number
- user_id: number
- status: string

Order Products
- id: number
- order_id: number
- product_id: number
- quantity: number


