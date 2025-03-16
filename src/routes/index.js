import express from "express";
import { verifyToken } from "../middlewares/verify.token.middleware.js";
import learnRoutes from "./learn.routes.js";
import serverRoutes from "./server.routes.js";
import userRoutes from "./user.routes.js";

const routes = express.Router();

routes.use(serverRoutes);
routes.use(userRoutes);
routes.use("/", verifyToken, learnRoutes);

export default routes;
