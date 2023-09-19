import client from "../database";

export type order_product = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class orders_products_store {
  async index(): Promise<order_product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from orders_products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get order products: ${err}`);
    }
  }

  async create(
    order_id: number,
    product_id: number,
    quantity: number,
  ): Promise<order_product> {
    try {
      const sql =
        "INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *;";
      const conn = await client.connect();
      const result = await conn.query(sql, [order_id, product_id, quantity]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      console.log(`Error: ${err}`);
      throw new Error(
        `Could not add product ${product_id} to order ${order_id}: ${err}`,
      );
    }
  }

  async show(order_id: number): Promise<order_product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders_products WHERE order_id=${order_id};`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to get order products: ${err}`);
    }
  }
}
