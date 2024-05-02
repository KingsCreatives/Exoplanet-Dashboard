const express = require("express");
const api = express.Router();

const planetRouter = require("../routes/planets.router");
const launchesRouter = require("../routes/launches.router");

api.use("/planets", planetRouter);
api.use("/launches", launchesRouter);

module.exports = api;
