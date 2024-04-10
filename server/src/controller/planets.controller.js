const {getAllPlanets} = require('../models/planets.model')

function httpGetAllPlanets(req, res){
   return res.json(getAllPlanets())
}

module.exports = {
    httpGetAllPlanets,
}