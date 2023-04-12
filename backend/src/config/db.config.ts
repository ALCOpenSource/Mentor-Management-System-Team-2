import { Sequelize } from "sequelize-typescript";
import { User } from "../model/user.model";

export const connect = () => {
  const hostName = process.env.DATABASE_HOST as string;
  const userName = process.env.DATABASE_USER as string;
  const password = process.env.DATABASE_PASSWORD as string;
  const database = process.env.DATABASE_DB as string;
  const dialect: any = process.env.DATABASE_DIALECT as string;


  const operatorsAliases: any = false;

  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    dialect,
    operatorsAliases,
    repositoryMode: true,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
    models: [User],
  });

  return {
    sequelize,
    Sequelize,
  };
};
