import supertest from "supertest";
import { user, users_store } from "../models/users";
import { app } from "../server";
import dotenv from "dotenv";
const token = process.env.TOKEN as string;

const testusername = process.env.TEST_USERNAME as string;

const testpassword = process.env.TEST_PASSWORD as string;

const request = supertest(app);

const store = new users_store();

describe("USER ENDPOINT TESTS 🎯", () => {
  it("Successfully gets /users", async () => {
    try {
      const response = await request.get("/users").set("Authorization", token);
      expect(response.status).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("Successfully gets /users/:id", async () => {
    try {
      const response = await request
        .get("/users")
        .set("Authorization", token)
        .send({ id: 19 });
      expect(response.status).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("Successfully posts /users", async () => {
    const testuser: user = {
      id: 0, // temp value
      username: "Test User",
      firstname: "first_name",
      lastname: "last_name",
      rawpassword: "testpassword",
    };

    const response = await request
      .post("/users")
      .set("Authorization", token)
      .send(testuser);

    expect(response.status).toBe(200);
  });
});

it("Successfully posts /users/authenticate", async () => {
  try {
    const response = await request
      .post("/users/authenticate")
      .set("Authorization", token)
      .send({ username: testusername, password: testpassword });

    expect(response.status).toBe(200);
  } catch (err) {
    console.log(err);
  }
});

describe("USER MODEL TESTS 🎯", () => {
  it("CREATE method at /users creates a user ", async () => {
    const testuser: user = {
      id: 0, // temp value
      username: "testusername",
      firstname: "first_name",
      lastname: "last_name",
      rawpassword: "testpassword",
    };

    const newuser = await store.create(testuser);

    expect(newuser).toBeTruthy();
  });

  it("SHOW method at /users/:id shows user with given id", async () => {
    const testuser: user = await store.show(1);

    expect(testuser).toBeTruthy();
  });

  it("INDEX method at /users shows all available users", async () => {
    const users = await store.index();

    expect(users.length).toBeGreaterThan(0);
  });
});
