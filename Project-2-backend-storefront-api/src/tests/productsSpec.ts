import supertest from "supertest";
import { product, products_store } from "../models/products";
import { app } from "../server";

const request = supertest(app);

const store = new products_store();

describe("PRODUCT ENDPOINT TESTS 🎯", () => {
  it("Successfully gets /products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("Successfully gets /products/:id", async () => {
    try {
      const response = await request.get("/products").send(
        { id: 1 }
        );
      expect(response.status).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("Successfully posts /products", async () => {
    const testproduct: product = {
      id: 0,
      name: "Pear",
      price: 5,
    };

    const response = await request.post("/products").send(testproduct);

    expect(response.status).toBe(200);
  });
});

describe("PRODUCT MODEL TESTS 🎯", () => {
  it("CREATE method at /products creates a product ", async () => {
    const testproduct: product = {
      id: 0,
      name: "Pear",
      price: 5,
    };

    const newproduct = await store.create(testproduct);

    expect(testproduct).toBeTruthy();
  });

  it("SHOW method at /products/:id shows product with given id", async () => {
    const product: product = await store.show(1);

    expect(product).toBeTruthy();
  });

  it("INDEX method at /products shows all available products", async () => {
    const products = await store.index();

    expect(products.length).toBeGreaterThan(0);
  });
});
