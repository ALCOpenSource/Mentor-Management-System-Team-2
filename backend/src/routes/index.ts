import express from "express";
import authRoute from "./user.route";
const routes = express.Router();

routes.use("/auth", authRoute);


export default routes;
