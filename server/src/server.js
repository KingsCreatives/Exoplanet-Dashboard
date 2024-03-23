const http = require('http')
const app = require('./app')
const PORT = process.env.PORT || 8000
const { loadPlanetsData } = require("./models/planets.model");


const server = http.createServer(app)

async function startServer(){
   await loadPlanetsData()

  server.listen(PORT, () => {
    console.log(`Server running on Port : ${PORT}`);
  });
}

startServer()

