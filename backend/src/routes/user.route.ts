import express from "express";
import userController from "../controller/user.controller";
import { loginMiddleware } from "../helpers/middleware";

const router = express.Router();

router.post("/login", loginMiddleware, userController.login);

export default router;
