const express = require('express')
const planetsRouter = express.Router()
const planetsController = require("../controller/planets.controller")


planetsRouter.get("/planets", planetsController.getAllPlanets)

module.exports = planetsRouter