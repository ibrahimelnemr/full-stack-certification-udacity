import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import client from "./database";

import users_routes from "./handlers/users";
import orders_routes from "./handlers/orders";
import orders_products_routes from "./handlers/ordersProducts";
import products_routes from "./handlers/products";
import dotenv from "dotenv";

dotenv.config();

export const app: express.Application = express();
const PORT: string = "3000";

const corsOptions = {};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.get("/testdb", async (req: express.Request, res: express.Response) => {
  try {
    const conn = await client.connect();
    const sql = "SELECT * from users";
    const result = await conn.query(sql);
    const rows = result.rows;
    conn.release();
    res.send(`Client Connected Successfully! ${rows}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});

products_routes(app);
users_routes(app);
orders_routes(app);
orders_products_routes(app);

app.listen(3000, function () {
  console.log(`starting app on port: ${PORT}`);
});
