const express = require('express')
const router = express.Router()
const {getPlanets} = require("../controller/planets.controller")


router.get("/planets", getPlanets)