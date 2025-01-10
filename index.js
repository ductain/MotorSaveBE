const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const authRoute = require("./routes/accountRoutes");
const stationRoute = require("./routes/stationRoutes");

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

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/stations", stationRoute);

app.listen(port, () => {
  console.log(`Backend is running at port ${port}`);
});
