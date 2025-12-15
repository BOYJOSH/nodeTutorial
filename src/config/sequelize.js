import { config } from "./env.js";
import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
//   host: 'localhost',
//   dialect: "postgres"
// });

const isProduction = config.nodeEnv === 'production';

export const sequelize = new Sequelize(config.databaseURL, {
  logging: false,
  dialect: 'postgres',
  dialectOptions:{
    ssl: isProduction ? {
      require: true,
      rejectUnauthorized: false 
    } : false,
  }
});