import express from "express";
import { user, users_store } from "../models/users";
import { verifyAuthToken } from "../utils/verifyAuthToken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const token = process.env.TOKEN as string;

dotenv.config();

const store = new users_store();

const index = async (_req: express.Request, res: express.Response) => {
  try {
const users = await store.index();
  res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
  
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const newuser: user = {
      id: 0, // id will not be used by create function; just a temporary value
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      rawpassword: req.body.rawpassword,
    };

    const result = await store.create(newuser);

    const token = jwt.sign(
      { user: newuser },
      process.env.TOKEN_SECRET as jwt.Secret,
    );

    res.json(token);
    console.log(`User added successfully with token ${token}`);
  } catch (err) {
    console.log(`Could not add user: ${err}`);
    res.json(err);
    res.status(400);
  }
};

const authenticate = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const newuser = await store.authenticate(username, password);

    const token = jwt.sign(
      { user: newuser },
      process.env.TOKEN_SECRET as string,
    );

    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
 const user = await store.show(req.body.id);
  res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
 
};

const users_routes = (app: express.Application) => {
  // GET — INDEX
  app.get("/users", verifyAuthToken, index).set("Authorization", token);

  // GET — SHOW
  app.get("/users/:id", verifyAuthToken, show).set("Authorization", token);

  // GET — AUTHENTICATE
  app
    .post("/users/authenticate", verifyAuthToken, authenticate)
    .set("Authorization", token);

  // POST — CREATE
  app.post("/users", verifyAuthToken, create).set("Authorization", token);
};

export default users_routes;
