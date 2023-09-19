import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    const token = (authorizationHeader as string).split(" ")[1];

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    console.log("Token verified successfully!");
    next();
  } catch (err) {
    res.status(401);
    console.log(`Could not verify token: ${err}`);
    res.json(`Invalid token: ${err}`);
  }
};
