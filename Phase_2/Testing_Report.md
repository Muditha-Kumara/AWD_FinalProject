# Phase 2 Test Report

## 1. Introduction
This report documents the testing process for Phase 2 - Basic Structure and Main Functionalities of the project. The tests cover API endpoints for loan calculations, user authentication workflows, and error handling scenarios. The goal is to verify that all core backend functionalities work as expected before proceeding to Phase 3.

## 2. Test Environment
| Component          | Technology Used         |
|--------------------|-------------------------|
| Backend Framework  | Node.js with Express    |
| Testing Framework  | Jest + Supertest        |
| Database           | PostgreSQL              |
| Authentication     | JWT (Token-based)       |
| Test Environment   | Local development setup |

## 3. Test Cases

### 3.1 Loan Calculation API Endpoints

| Test Case ID | Endpoint                          | Test Scenario                          | Expected Status | Actual Status | Pass/Fail | Notes |
|--------------|-----------------------------------|----------------------------------------|-----------------|---------------|-----------|-------|
| TC-001       | GET /api/loans                    | Fetch all loan types                   | 200             | 200            | Pass      |       |
| TC-002       | POST /api/calculations/save       | Save new loan calculation              | 201             | 201            | Pass      |       |
| TC-003       | GET /api/loans/calculations/all   | Retrieve all saved calculations        | 200             | 200            | Pass      |       |

### 3.2 User Authentication Endpoints

| Test Case ID | Endpoint                   | Test Scenario                          | Expected Status | Actual Status | Pass/Fail | Notes |
|--------------|----------------------------|----------------------------------------|-----------------|---------------|-----------|-------|
| TC-004       | POST /api/users/register    | Register new user                      | 201             | 201            | Pass      |       |
| TC-005       | POST /api/users/register    | Register with missing password         | 400             | 400            | Pass      |       |
| TC-006       | POST /api/users/register    | Register with missing email            | 400             | 400            | Pass      |       |
| TC-007       | POST /api/users/login       | Login with valid credentials           | 200             | 200            | Pass      |       |
| TC-008       | POST /api/users/login       | Login with invalid credentials         | 401             | 401            | Pass      |       |

## 4. Automated Testing Details

### 4.1 Test Coverage
- API Routes: 85% coverage
- Core Business Logic: 90% coverage
- Error Handling: 75% coverage

### 4.2 Example Test Code
```javascript
describe("Loan Calculation API", () => {
  it("should save a new calculation", async () => {
    const response = await request(app)
      .post("/api/calculations/save")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        title: "Test Calculation",
        loanAmount: 250000,
        interestRate: 4.2,
        term: 15,
        termType: "years"
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message");
  });
});