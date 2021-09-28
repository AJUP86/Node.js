import supertest from "supertest";
import { app } from "../server.js";
const request = supertest(app);

describe("POST /:cityName", () => {
  it("get status city name and temperature", () => {
    request.post("/managua").then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("cityName");
      expect(res.body).toHaveProperty("temperature");
    });
  });
});
