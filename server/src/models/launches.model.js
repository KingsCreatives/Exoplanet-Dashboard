const launchDatabase = require("./launchSchema");
const planetDatabase = require("./planetsSchema");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("January 27, 2034"),
  target: "Kepler-452 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function getAllLaunches() {
  return await launchDatabase.find({}, { __id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  try {
    const planet = await planetDatabase.findOne({ keplerName: launch.target });

    if (!planet) {
      throw new Error("planet not available");
    }

    const newLaunch = await launchDatabase.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );

    return newLaunch;
  } catch (error) {
    console.error("Error saving launch:", error);
    return undefined;
  }
}

async function latestFlightNumer() {
  const latestFlight = await launchDatabase.findOne().sort("-flightNumber");
  if (!latestFlight) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestFlight.flightNumber;
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await latestFlightNumer()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    upcoming: true,
    success: true,
    customers: ["Zero To Mastery", "NASA"],
  });
  await saveLaunch(newLaunch);
}

async function findLaunchById(launchId) {
  return await launchDatabase.findOne({ flightNumber: launchId });
}

async function abortLaunch(id) {
  const aborted = await launchDatabase.updateOne(
    {
      flightNumber: id,
    },
    {
      success: false,
      upcoming: false,
    }
  );

  return aborted.acknowledged === true && aborted.matchedCount === 1;
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  findLaunchById,
  abortLaunch,
};
