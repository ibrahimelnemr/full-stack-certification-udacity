import express from "express";
import { order_product, orders_products_store } from "../models/ordersProducts";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TOKEN as string;

const store = new orders_products_store();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const order_products = await store.index();
    res.json(order_products);
  } catch (err) 
  {
    res.status(400);
    res.json(err);
   }
  
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const order_products = await store.show(req.body.user_id);
    res.json(order_products);
  } catch (err) 
  {
    res.status(400);
    res.json(err);
   }
  
};

const create = async (req: express.Request, res: express.Response) => {
  const order_id: number = req.body.order_id;
  const product_id: number = req.body.product_id;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedProduct = await store.create(order_id, product_id, quantity);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orders_products_routes = (app: express.Application) => {
  // GET - INDEX
  app.get("/ordersproducts", index).set("Authorization", token);

  // GET - SHOW
  app.get("/ordersproducts/:id", show).set("Authorization", token);

  // POST - CREATE
  app.post("/ordersproducts", create).set("Authorization", token);
};

export default orders_products_routes;
