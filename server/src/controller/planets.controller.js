const planets = require("../models/planets.model")

function getPlanets(req, res){
    return planets
}

module.exports = {
    getPlanets,
}