const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connection.once("open", () => {
  console.log("MongoDb connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const MONGO_URL = process.env.MONGO_URL;

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  mongoConnect,
};
