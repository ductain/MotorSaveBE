const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const authRoute = require("./routes/accountRoutes");
const stationRoute = require("./routes/stationRoutes");
const staffInStationRoute = require("./routes/staffInStationRoutes");
const customerVehicleRoute = require("./routes/customerVehicleRoutes");
const driverVehicleRoute = require("./routes/driverVehicleRoutes");
const feedbackRoute = require("./routes/feedbackRoutes");
const vehicleTypeRoute = require("./routes/vehicleTypeRoutes");
const brandRoute = require("./routes/brandRoutes");
const requestTypeRoute = require("./routes/requestTypeRoutes");
const serPackageRoute = require("./routes/serPackageRoutes");
const distanceRoute = require("./routes/distanceRoutes");
const requestRoute = require("./routes/requestRoutes");
const transactionRoute = require("./routes/transactionRoutes");
const repairCostPreviewsRoute = require("./routes/repairCostPreviewRoutes");

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.9/swagger-ui.min.css";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "https://motor-save-be.vercel.app/api/v1/",
      },
      {
        url: "http://localhost:5000/api/v1/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);

const app = express();

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { customCssUrl: CSS_URL })
);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://motor-save-be.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/stations", stationRoute);
app.use("/api/v1/staffinstations", staffInStationRoute);
app.use("/api/v1/customerVehicles", customerVehicleRoute);
app.use("/api/v1/driverVehicles", driverVehicleRoute);
app.use("/api/v1/feedbacks", feedbackRoute);
app.use("/api/v1/vehicletypes", vehicleTypeRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/requestTypes", requestTypeRoute);
app.use("/api/v1/servicepackages", serPackageRoute);
app.use("/api/v1/distance", distanceRoute);
app.use("/api/v1/requests", requestRoute);
app.use("/api/v1/transactions", transactionRoute);
app.use("/api/v1/repaircostpreviews", repairCostPreviewsRoute);

app.listen(port, () => {
  console.log(`Backend is running at port ${port}`);
});
