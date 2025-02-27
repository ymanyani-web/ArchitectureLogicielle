import request from "supertest";
import app from "../app";

describe("Leave Requests API", () => {
  test("should require authentication", async () => {
    const response = await request(app).get("/api/leave-requests");
    expect(response.status).toBe(401);
  });
});
