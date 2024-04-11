const launches = new Map();

let currentFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  currentFlightNumber++;
  launches.set(
    currentFlightNumber,
    Object.assign(launch, {
      flightNumber: currentFlightNumber,
      upcoming: true,
      success: true,
      customers: ["Zero To Mastery", "NASA"],
    })
  );
}

function findLaunchById(launchId) {
  return launches.has(launchId);
}

function abortLaunch(id) {
  const aborted = launches.get(id);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  findLaunchById,
  abortLaunch,
};
