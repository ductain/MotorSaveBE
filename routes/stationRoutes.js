const {
  getStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");

const router = require("express").Router();

router.get("/", getStations);
router.get("/:id", getStationById);
router.post("/", createStation);
router.put("/:id", updateStation);
router.delete("/:id", deleteStation);

module.exports = router;
