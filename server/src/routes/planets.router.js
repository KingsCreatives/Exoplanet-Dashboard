const express = require('express')

const planetsRouter = express.Router()

const {
    getAllPlanets,
} = require('../controller/planets.controller')


planetsRouter.get('/planets', getAllPlanets)

module.exports = planetsRouter