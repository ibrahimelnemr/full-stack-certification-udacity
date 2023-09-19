import client from "../database";

export type order = {
  id: number;
  user_id: number;
  status: string;
};

export class orders_store {
  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders: ${err}`);
    }
  }

  async show(id: number): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id=${id};`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to get orders: ${err}`);
    }
  }

  async create(order: order): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT into orders (user_id,status) VALUES 
            ($1,$2) RETURNING *;`;
      const result = await conn.query(sql, [order.user_id, order.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot create order ${order}: ${err}`);
    }
  }
}
