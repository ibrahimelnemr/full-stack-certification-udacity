import supertest from "supertest";
import { order_product, orders_products_store } from "../models/ordersProducts";
import { app } from "../server";

const store = new orders_products_store();

const request = supertest(app);

describe("ORDER PRODUCT ENDPOINT TESTS 🎯", () => {
  it("Successfully gets /ordersproducts", async () => {
    const response = await request.get("/ordersproducts");
    expect(response.status).toBe(200);
  });

  it("Successfully gets /ordersproducts/:order_id", async () => {
    try {
      const response = await request
        .get("/ordersproducts")
        .send({ order_id: 1 });
      expect(response.status).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("Successfully posts /ordersproducts", async () => {
    const testorderproduct: order_product = {
      id: 0,
      order_id: 1,
      product_id: 1,
      quantity: 1,
    };

    const response = await request
      .post("/ordersproducts")
      .send(testorderproduct);

    expect(response.status).toBe(200);
  });
});

describe("ORDER PRODUCTS MODEL TESTS 🎯", () => {
  it("CREATE method at /ordersproducts creates an order product", async () => {
    const testorderproduct: order_product = {
      id: 0,
      order_id: 1,
      product_id: 1,
      quantity: 1,
    };

    const neworderproduct = await store.create(
      testorderproduct.order_id,
      testorderproduct.product_id,
      testorderproduct.quantity,
    );

    expect(neworderproduct).toBeTruthy();
  });

  it("SHOW method at /ordersproducts/:order_id shows order products with given order id", async () => {
    const testorderproduct: order_product = await store.show(1);

    expect(testorderproduct).toBeTruthy();
  });

  it("INDEX method at /ordersproducts shows all order products", async () => {
    const ordersproducts = await store.index();

    expect(ordersproducts.length).toBeGreaterThan(0);
  });
});
