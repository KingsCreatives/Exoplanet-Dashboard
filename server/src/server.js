const http = require("http");
const app = require("./app");
const { mongoConnect } = require("../src/services/mongo");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const { loadPlanetData } = require("./models/planets.model");

async function startServer() {
  await mongoConnect()
  await await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}.......`);
  });
}

startServer();
