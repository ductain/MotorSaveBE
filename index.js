const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;
const stationRoute = require('./routes/stationRoutes')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/stations', stationRoute)

app.listen(port, () => {
    console.log(`Backend is running at port ${port}`)
})