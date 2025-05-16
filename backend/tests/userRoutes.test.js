/* eslint-env jest */
const request = require("supertest");
const app = require("../src/index"); 

describe("Integration Tests for API Endpoints", () => {
  let token;

  beforeAll(async () => {
    // Register a user
    const uniqueEmail = `test+${Date.now()}@example.com`;
    const uniquePassword = `pass${Date.now()}`;
    await request(app).post("/api/users/register").send({
      name: "Test User",
      email: uniqueEmail,
      password: uniquePassword,
    });

    // Login to get token
    const res = await request(app).post("/api/users/login").send({
      email: uniqueEmail,
      password: uniquePassword,
    });
    token = res.body.token;
  });

  it("should fetch loan types", async () => {
    const res = await request(app).get("/api/loans");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should save a loan calculation", async () => {
    const res = await request(app)
      .post("/api/calculations/save")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Calculation",
        description: "Test Description",
        loanTypeName: "Home Loan",
        loanAmount: 100000,
        interestRate: 3.5,
        term: 30,
        termType: "years",
        monthlyPayment: 449.04,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Calculation saved successfully");
  });

  it("should fetch all saved calculations", async () => {
    const res = await request(app)
      .get("/api/loans/calculations/all")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

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
    expect(res.statusCode).toBe(201);
  });

  it("should not register with missing password", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ email: "" });
    expect(res.statusCode).toBe(400);
  });

  it("should not register with missing email", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ password: "password" });
    expect(res.statusCode).toBe(400);
  });
});
