const express = require("express");

const launchesRouter = express.Router();

const {
  httpGetAllLaunches,
  httpScheduleNewLaunch,
  httpAbortLaunch,
} = require("../controller/launches.controller");

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpScheduleNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
