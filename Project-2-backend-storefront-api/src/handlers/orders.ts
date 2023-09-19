import express from "express";
import { order, orders_store } from "../models/orders";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TOKEN as string;

const store = new orders_store();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) 
  {
    res.status(400);
    res.json(err);
   }
  
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const order = await store.show(req.body.id);
  res.json(order);
  }
  catch (err) 
 {
  res.status(400);
  res.json(err);
  }
  
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const order: order = {
      id: 0,
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const neworder = await store.create(order);
    res.json(neworder);
    console.log(`Order added to store successfully.`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orders_routes = (app: express.Application) => {
  // GET - INDEX
  app.get("/orders", index).set("Authorization", token);

  // GET - SHOW
  app.get("/orders/:id", show).set("Authorization", token);

  // POST - CREATE
  app.post("/orders", create).set("Authorization", token);
};

export default orders_routes;
