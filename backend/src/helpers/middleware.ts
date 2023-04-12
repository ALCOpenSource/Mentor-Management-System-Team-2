import { handleError } from "../utils/error";
import { loginSchema } from "./validation";
import rateLimit from "express-rate-limit";

import express from "express";

export const loginMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const requestBody = req.body;
  try {
    await loginSchema.validateAsync(requestBody);
  } catch (error) {
    const { code, message, error: e } = handleError(error);
    return res.status(code).json({ message, error: e });
  }
  next();
};

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 login attempts within 15 minutes
  message: 'Too many login attempts, please try again later'
});

