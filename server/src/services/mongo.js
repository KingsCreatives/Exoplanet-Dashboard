const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDb connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const MONGO_URL =
  "mongodb+srv://skamoah882:Myddsbft0Sw4aWmg@cluster0.2ivpwuh.mongodb.net/nasa?retryWrites=true&w=majority&appName=Cluster0";

async function mongoConnect(){
  await mongoose.connect(MONGO_URL);
}

module.exports = {
    mongoConnect,
}
