const request = require("supertest");
const app = require("../index");

// Mock database for testing
jest.mock("../db", () => ({
  execute: jest.fn().mockResolvedValue([
    [
      { id: 1, name: "Test Product", price: 10, unit: "kg", category: "test", created_at: new Date() }
    ]
  ])
}));

describe("API Test", () => {
  it("gets products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("products");
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  it("returns 200 for /api/me when not authenticated", async () => {
    const res = await request(app).get("/api/me");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("user");
  });
});
