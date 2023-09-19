import client from "../database";
import bcrypt from "bcrypt";
import { verifyAuthToken } from "../utils/verifyAuthToken";
import dotenv from "dotenv";

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;

const saltRounds = process.env.SALT_ROUNDS;

export type user = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  rawpassword: string;
};

export class users_store {
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from users;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users: ${err}`);
    }
  }

  async show(id: number): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE id=${id};`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to get users: ${err}`);
    }
  }

  async create(newuser: user): Promise<user> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (username, firstname,lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *;";

      const hash = bcrypt.hashSync(
        newuser.rawpassword + pepper,
        parseInt(saltRounds as string),
      );

      const result = await conn.query(sql, [
        newuser.username,
        newuser.firstname,
        newuser.lastname,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable to create user (${newuser.username}): ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<user | null> {
    const conn = await client.connect();

    const sql = `SELECT password_digest FROM users WHERE username='${username}';`;
    
    try {
      const result = await conn.query(sql);

      // console.log(password+pepper)
  
      if (result.rows.length) {
        const user = result.rows[0];
  
        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          console.log(`User Authenticated!: ${username}`);
          return user;
        }
      }
      console.log(`User not found: ${username}`);
      return null;
    } catch (err) {
      console.log(`Error: ${err}`);
      return null;
    }
    
  }
}
