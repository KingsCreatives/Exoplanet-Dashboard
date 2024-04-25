const {getAllPlanets} = require('../models/planets.model')

async function httpGetAllPlanets(req, res){
   return res.json(await getAllPlanets())
}

module.exports = {
    httpGetAllPlanets,
}