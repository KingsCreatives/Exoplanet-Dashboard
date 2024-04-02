const http = require('http')

const PORT = process.env.PORT || 8000

const app = require('./app')

const server = http.createServer(app)

const {loadPlanetData} = require('./models/planets.model')

async function startServer(){
   await loadPlanetData()

   server.listen(PORT, () => {
     console.log(`Server is running on Port: ${PORT}.......`);
   });
}

startServer()

