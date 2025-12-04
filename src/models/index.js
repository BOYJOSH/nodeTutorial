import { sequelize } from "../config/sequelize.js";
import { User } from "./user.js";
import { bankAccount } from "./bankAccount.js";


export const initDB = async () => {
  try {

     await sequelize.authenticate();
     console.log('Connection has been established successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export {User};