import express from "express";
import userController from "../controller/user.controller";
import { loginMiddleware, loginRateLimiter } from "../helpers/middleware";

const authRoute = express.Router();

authRoute.post("/login", loginRateLimiter, loginMiddleware, userController.login);
//authRoute.post("/resetpassword", userController.resetPassword);


export default authRoute;
