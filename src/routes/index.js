const express = require("express");
const serverRoutes = require("./server.routes");

const routes = express.Router();

routes.use(serverRoutes);

module.exports = routes;
