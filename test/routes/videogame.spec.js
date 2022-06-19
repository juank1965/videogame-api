import expect from "chai";
import session from "supertest-session";
import app from "../../src/app.js";
import Videogame from "../../src/models/Videogame.js";
import sequelize from "../../src/db";

describe("Videogame by id route", () => {
  describe("GET /api/videogame/", () => {
    it("should get 404 if we dont send data", () =>
      agent.get("/api/videogame/").expect(404));
  });
  describe("GET /videogame/", () => {
    it("should get 404 if we dont send data", () =>
      agent.get("/api/videogame/").expect(404));
  });
  describe("GET /api/videogame/:id", () => {
    it("should get 200 if we send data", () =>
      agent.get("/api/videogame/5").expect(200));
  });
});
