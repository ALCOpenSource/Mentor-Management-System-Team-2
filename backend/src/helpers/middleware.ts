import { handleError } from "../utils/error";
import { loginSchema } from "./validation";

import express from "express";

export const loginMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const requestBody = req.body;
  try {
    await loginSchema.validateAsync(requestBody);
    console.log("what is going on");
  } catch (error) {
    const { code, message, error: e } = handleError(error);
    return res.status(code).json({ message, error: e });
  }
  next();
};
