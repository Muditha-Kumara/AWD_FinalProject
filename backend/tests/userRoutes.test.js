/* eslint-env jest */
const request = require("supertest");
const app = require("../src/index"); // Adjust path if needed

describe("User Routes", () => {
  it("should register a user", async () => {
    const uniqueUsername = `user${Date.now()}`;
    const uniqueEmail = `test+${Date.now()}@example.com`;
    const uniquePassword = `pass${Date.now()}`;
    const res = await request(app).post("/api/users/register").send({
      email: uniqueEmail,
      password: uniquePassword,
      name: uniqueUsername,
    });
    if (res.statusCode !== 201) {
      console.error("Response body:", res.body);
    }
    expect(res.statusCode).toBe(201);
  });

  it("should not register with missing password", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ email: "" });
    if (res.statusCode !== 400) {
      console.error("Response body:", res.body);
    }
    expect(res.statusCode).toBe(400);
  });

  it("should not register with missing email", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ password: "password" });
    if (res.statusCode !== 400) {
      console.error("Response body:", res.body);
    }
    expect(res.statusCode).toBe(400);
  });
});
