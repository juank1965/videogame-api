import { Sequelize } from "sequelize";

const { DB_USER, DB_PASS, DB_NAME, DB_HOST, DB_PORT } = process.env;

export const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    /*operatorsAliases: false,*/
    define: {
      underscored: true,
      /*freezeTableName: true,*/
      timestamps: false,
    },
  }
);
