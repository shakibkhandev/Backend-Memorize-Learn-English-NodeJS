const express = require("express");
const {
  serverRunning,
  healthCheck,
} = require("../controllers/server.controllers");

const serverRoutes = express.Router();

serverRoutes.get("/", serverRunning);
serverRoutes.get("/health", healthCheck);

module.exports = serverRoutes;
