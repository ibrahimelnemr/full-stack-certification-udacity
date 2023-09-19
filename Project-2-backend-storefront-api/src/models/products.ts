import client from "../database";

export type product = {
  id: number;
  name: string;
  price: number;
};

export class products_store {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from products;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products: ${err}`);
    }
  }

  async show(id: number): Promise<product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id=${id};`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to get products: ${err}`);
    }
  }

  async create(product: product): Promise<product> {
    try {
      const conn = await client.connect();
      const sql = `INSERT into products (name,price) VALUES 
            ($1,$2) RETURNING *;`;
      const result = await conn.query(sql, [product.name, product.price]);
      conn.release();
      // return result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`cannot create product ${product}: ${err}`);
    }
  }
}
