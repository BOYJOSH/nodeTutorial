import { config } from "./env.js";


export default {
  development: {
    username: config.db.user,
    password: config.db.pass,
    database: config.db.name,
    host: config.db.host,
    dialect: "postgres"
  },
  // test: {
  //   username: "root",
  //   password: null,
  //   database: "database_test",
  //   host: "127.0.0.1",
  //   dialect: "mysql"
  // },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
    username: config.db.user,
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}