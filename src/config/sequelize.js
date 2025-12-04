import { config } from "./env.js";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: 'localhost',
  dialect: "postgres"
});