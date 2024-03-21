const express = require('express')
const cors = require('cors')
const app = express()

app.use(
  cors({
    origin: "http://localhost:8000",
  })
);
app.use(express.json())



module.exports = app;