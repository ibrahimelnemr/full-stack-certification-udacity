# Instructions

**Set up and connect to database**

Development DB

* Check credentials in .env
* There are credentials for both a development database and a test database. Create both: 

POSTGRES_HOST=127.0.0.1
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password


POSTGRES_DB=backend_storefront
POSTGRES_DB_TEST=backend_storefront_test 


The credentials are the same except for the database, as one is for development and one is for testing. 

Run 

`createdb backend_storefront` to create the development database and `createdb backend_storefront_test` to create the testing database.

Then run `db-migrate up` to create the tables needed.

For the test database, run `db-migrate -e test up`. This will be automatically done if you run `npm run test`.

To allow for testing to work out of the box, the migrations for the best database include inserting initial values into the tables, so there are results for SHOW and INDEX endpoints. 

Without these initial values, many tests will not work. They can also be run directly from the terminal; these are the SQL statements to insert the initial test values:

INSERT INTO products (name, price) VALUES ('Apple', 10);

INSERT INTO users (username, firstname, lastname, password_digest) VALUES ('pineapple4290', 'John', 'Smith', 'pineapple');

INSERT INTO orders (user_id, status)
VALUES (1, 'completed');

INSERT INTO orders_products (order_id, product_id, quantity) VALUES (1,1,1);


**Ports**

Run `npm run start`

Database server will be running on port `3000`

**Package installation**

cd `backend-storefront-api`
`npm install`
`npm run start`

**Troubleshooting**

To test run `npm run test`

Note that @types/jasmine must be version 3.6.3. If it is a different version, an error will be thrown from `reporter.ts` that will prevent the tests from working. In this case, run `npm i @types/jasmine@3.6
.3` and run `npm run test` again.

