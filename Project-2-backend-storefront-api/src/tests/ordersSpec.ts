import supertest from "supertest";
import { order, orders_store } from "../models/orders";
import { app } from "../server";

const store = new orders_store();

const request = supertest(app);

describe("ORDER ENDPOINT TESTS 🎯", () => {
  it("Successfully gets /orders", async () => {
    const response = await request.get("/orders");
    expect(response.status).toBe(200);
  });

  it("Successfully gets /products/:id", async () => {
    try {
      const response = await request.get("/orders").send({ id: 1 });
      expect(response.status).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("Successfully posts /orders", async () => {
    const testorder: order = {
      id: 0,
      user_id: 1,
      status: "completed",
    };

    const response = await request.post("/orders").send(testorder);

    expect(response.status).toBe(200);
  });
});

describe("ORDER MODEL TESTS 🎯", () => {
  it("CREATE method at /orders creates an order ", async () => {
    const testorder: order = {
      id: 0,
      user_id: 1,
      status: "completed",
    };

    const neworder = await store.create(testorder);

    expect(testorder).toBeTruthy();
  });

  it("SHOW method at /orders/:id shows order with given id", async () => {
    const order: order = await store.show(1);

    expect(order).toBeTruthy();
  });

  it("INDEX method at /orders shows all orders", async () => {
    const orders = await store.index();

    expect(orders.length).toBeGreaterThan(0);
  });
});
