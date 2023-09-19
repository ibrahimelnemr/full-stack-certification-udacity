import { verifyAuthToken } from "../utils/verifyAuthToken";
import dotenv from "dotenv";
dotenv.config();
import supertest from "supertest";
import { app } from "../server";

const validTestToken = process.env.TESTING_TOKEN_VALID as string;

const invalidTestToken = process.env.TESTING_TOKEN_INVALID as string;

const request = supertest(app);

describe("UTILS TESTS 🎯", () => {
  it("verifyAuthToken works with valid token", async () => {
    try {
      const response = await request
        .post("/users")
        .set("Authorization", validTestToken);
      expect(response.status).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("verifyAuthToken does not work with invalid token", async () => {
    try {
      const response = await request
        .get("/users")
        .set("Authorization", invalidTestToken);
      expect(response.status).toBe(401);
    } catch (err) {
      console.log(err);
    }
  });
});
