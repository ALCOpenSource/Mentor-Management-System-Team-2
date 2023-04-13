import * as path from "path";
import * as fs from "fs";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import config from "../config";

export const getAllModelsInDir = (dir: string) => {
  const basename = path.basename(__filename);
  const models: any = {};
  const modelsArray: any = [];

  fs.readdirSync(dir)
    .filter((file: string) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
      );
    })
    .forEach(async (file: string) => {
      const model = await import(path.join(dir, file));
      const key = Object.keys(model)[0];
      models[key] = model[key];
      modelsArray.push(model[key]);
    });
  return { models, modelsArray };
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, config().keys.ACCESS_KEY, {
    expiresIn: config().accessTokenMaxAge,
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, config().keys.REFRESH_KEY, {
    expiresIn: config().refreshTokenMaxAge,
  });
};

