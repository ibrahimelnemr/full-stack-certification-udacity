import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const env = process.env.ENV as string;

const host = process.env.POSTGRES_HOST as string; 
const db = process.env.POSTGRES_DB as string;
const db_test = process.env.POSTGRES_DB_TEST as string;
const user = process.env.POSTGRES_USER as string; 
const password = process.env.POSTGRES_PASSWORD as string;

const client = new Pool({
  host: host,
  database: db_test,
  user: user,
  password: password,
});

export default client;
