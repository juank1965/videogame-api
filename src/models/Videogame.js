import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import Genre from "./Genre.js";
import Platform from "./Platform.js";

const Videogame = sequelize.define(
  "videogame",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Videogame.belongsToMany(Genre, { through: "videogame_genre" });
Videogame.belongsToMany(Platform, { through: "videogame_platform" });
Genre.belongsToMany(Videogame, { through: "videogame_genre" });
Platform.belongsToMany(Videogame, { through: "videogame_platform" });

export default Videogame;
