const  express = require('express')

const cors = require('cors')

const app = express()

const planetRouter = require('./routes/planets.router')

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json())

app.use(planetRouter)

module.exports = app;