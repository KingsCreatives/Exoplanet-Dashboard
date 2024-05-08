const axios = require("axios");
const SPACEX_LAUNCH_API_URL = "https://api.spacexdata.com/v4/launches/query";
const launchDatabase = require("./launchSchema");
const planetDatabase = require("./planetsSchema");

const DEFAULT_FLIGHT_NUMBER = 100;

async function getAllLaunches(skip, limit) {
  return await launchDatabase
    .find({}, { __id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function saveLaunch(launch) {
  try {
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
    console.log("Error saving launch:", error);
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
  const planet = await planetDatabase.findOne({ keplerName: launch.target });

  if (!planet) {
    throw new Error("planet not available");
  }

  const newFlightNumber = (await latestFlightNumer()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    upcoming: true,
    success: true,
    customers: ["Zero To Mastery", "NASA"],
  });
  await saveLaunch(newLaunch);
}

async function findLaunch(filter) {
  return await launchDatabase.findOne(filter);
}

async function findLaunchById(launchId) {
  return await findLaunch({ flightNumber: launchId });
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

async function getSpaceXLaunches() {
  const response = await axios.post(SPACEX_LAUNCH_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
      ],
    },
  });
  const responseData = await response.data.docs;

  for (const data of responseData) {
    const payload = data["payloads"];
    const customers = payload.flatMap((payload) => {
      return payload.customers;
    });

    const launch = {
      flightNumber: data.flight_number,
      mission: data.name,
      rocket: data.rocket.name,
      launchDate: new Date(data.date_local),
      upcoming: data.upcoming,
      success: data.success,
      customers,
    };
    await saveLaunch(launch);
  }
}

async function loadSpaceXLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    name: "FalconSat",
    mission: "Falcon 1",
  });

  if (firstLaunch) {
    console.log("Launch data already loaded");
  } else {
    await getSpaceXLaunches();
  }
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  findLaunchById,
  abortLaunch,
  loadSpaceXLaunchesData,
};
