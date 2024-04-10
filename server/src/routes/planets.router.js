const express = require('express')

const planetsRouter = express.Router()

const {
    httpGetAllPlanets,
} = require('../controller/planets.controller')


planetsRouter.get('/', httpGetAllPlanets)

module.exports = planetsRouter