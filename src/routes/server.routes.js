import express from "express";
import {
  serverRunning,
  healthCheck,
} from "../controllers/server.controllers.js";

const serverRoutes = express.Router();

serverRoutes.get("/", serverRunning);
serverRoutes.get("/health", healthCheck);

export default serverRoutes;
