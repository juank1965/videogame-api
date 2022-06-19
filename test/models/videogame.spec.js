import Videogame from "../../src/models/Videogame.js";
import sequelize from "../../src/db.js";
import expect from "chai";

describe("Videogame model", () => {
  before(() =>
    sequelize.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if title is null", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Videogame.create({ name: "Henry War Code" });
      });
      it("should work when its a valid description", () => {
        Videogame.create({
          description: "Restos de codigo para los Henry Students",
        });
      });
      it("should work when its a valid background_image", () => {
        Videogame.create({
          background_image:
            "https://www.softzone.es/app/uploads-softzone.es/2020/03/Programaci%C3%B3n-Videojuegos.jpg",
        });
      });
      it("should work when its a valid released date", () => {
        Videogame.create({ released: "10/06/2022" });
      });
      it("should work when its a valid rating", () => {
        Videogame.create({ rating: "4" });
      });
    });
  });
});
