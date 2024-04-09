const express = require("express");

const launchesRouter = express.Router();

const launchesController = require('../controller/launches.controller')

launchesRouter.get("/launches", launchesController.getAllLaunches );

module.exports = launchesRouter;
