import { Sequelize } from "sequelize";
import { User } from "../model/user.model";

export const dbInit = () => {
  const hostName = process.env.DATABASE_HOST as string;
  const userName = process.env.DATABASE_USER as string;
  const password = process.env.DATABASE_PASSWORD as string;
  const database = process.env.DATABASE_DB as string;
  const dialect: any = process.env.DATABASE_DIALECT as string;


  const operatorsAliases: any = false;

  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    dialect,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
    
  });

 
  return {
    sequelize,
    Sequelize,
  };
};

export const connect = dbInit();