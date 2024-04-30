const {
  getAllLaunches,
  scheduleNewLaunch,
  findLaunchById,
  abortLaunch,
} = require("../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpScheduleNewLaunch(req, res) {
  const launch = req.body;

  launch.launchDate = new Date(launch.launchDate);

  if (
    !launch.mission ||
    !launch.target ||
    !launch.rocket ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: "Mission required launch properties",
    });
  }

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid date format",
    });
  }

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const existLaunch = await findLaunchById(launchId);
  if (!existLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const abortedLaunch = await abortLaunch(launchId)

  if(!abortLaunch){
    res.json({
      error : 'Launch not aborted'
    })
  }
  return res.status(200).json({
    ok: true
  });
}

module.exports = {
  httpGetAllLaunches,
  httpScheduleNewLaunch,
  httpAbortLaunch,
};
