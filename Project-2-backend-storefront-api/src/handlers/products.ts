import express from "express";
import { product, products_store } from "../models/products";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN as string;

const store = new products_store();

const index = async (_req: express.Request, res: express.Response) => {
  const products = await store.index();
  res.json(products);
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const product: product = {
      id: 0, // id will not be used by create function; just a temporary value
      name: req.body.name,
      price: req.body.price,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
    console.log(
      `Product with name ${req.body.name} added to store successfully.`,
    );
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const product = await store.show(req.body.id);
    res.json(product);
  
  } catch (err) {
    res.status(400);
    res.json(err);
  }

 
};

const products_routes = (app: express.Application) => {
  // GET — INDEX
  app.get("/products", index);

  // GET — SHOW
  app.get("/products/:id", show);

  // POST — CREATE
  app.post("/products/", create).set("Authorization", token);
};

export default products_routes;
