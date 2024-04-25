const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const planets = require("./launchesSchema");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", async () => {
        console.log(
          `There are ${await getAllPlanets().length} habitable planets`
        );
        resolve();
      });
  });
}

async function savePlanet(planet) {
  try {
    return await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function getAllPlanets() {
  return await planets.find({});
}

module.exports = {
  loadPlanetData,
  getAllPlanets,
};
