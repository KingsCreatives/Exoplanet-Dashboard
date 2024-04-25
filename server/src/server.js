const http = require("http");
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8000;

const app = require("./app");

const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://skamoah882:Myddsbft0Sw4aWmg@cluster0.2ivpwuh.mongodb.net/nasa?retryWrites=true&w=majority&appName=Cluster0";

const { loadPlanetData } = require("./models/planets.model");

mongoose.connection.once('open', ()=>{
  console.log('MongoDb connection ready')
})

mongoose.connection.on('error', (err) => {
  console.error(err)
})

async function startServer() {
  await mongoose.connect(MONGO_URL)
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}.......`);
  });
}

startServer();
