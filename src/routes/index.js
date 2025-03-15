import express from "express";
import serverRoutes from "./server.routes.js";
import userRoutes from "./user.routes.js";

const routes = express.Router();

routes.use(serverRoutes);
routes.use(userRoutes);

export default routes;
