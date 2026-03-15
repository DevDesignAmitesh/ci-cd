import axios from "axios";
import { describe, it, expect } from "bun:test";

const BASE_URL = "https://uncombustive-scripturally-thomas.ngrok-free.dev";

const uniqueEmail = Math.random().toString();
const password = "password";

describe("auth endpoints", () => {
  describe("/signup", () => {
    it("it should fail as sending null body", async () => {
      expect(
        axios.post(`${BASE_URL}/signup`, {
          email: null,
          password: null,
        }),
      ).rejects.toMatchObject({
        response: { status: 400 },
        // message: "invalid inputs",
      });
    });

    it("it should succeed", async () => {
      const res = await axios.post(`${BASE_URL}/signup`, {
        email: uniqueEmail,
        password,
      });
      expect(res.status).toBe(201);
      expect(res.data.message).toBe("signup successfull");
      expect(res.data.data.userId).toBeDefined();
    });
  });
});
