const http = require("http");
const app = require("./app");
const { mongoConnect } = require("../src/services/mongo");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const { loadPlanetData } = require("./models/planets.model");
const { loadSpaceXLaunchesData } = require("./models/launches.model");

async function startServer() {
  await mongoConnect()
  await loadPlanetData();
  await loadSpaceXLaunchesData();
  server.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}.......`);
  });
}

startServer();
