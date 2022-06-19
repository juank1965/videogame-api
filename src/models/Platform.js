import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

const Platform = sequelize.define(
  "platform",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Platform;
