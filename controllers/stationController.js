const stationService = require("../services/stationService");

const getStations = async (req, res) => {
  try {
    const stations = await stationService.getStations();
    res.status(200).json(stations);
  } catch (err) {
    console.error("Error fetching stations:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getStationById = async (req, res) => {
  try {
    const stationId = req.params.id;
    const station = await stationService.getStationById(stationId);
    if (!station) {
      return res.status(404).json({ message: "station not found" });
    }
    res.status(200).json(station);
  } catch (err) {
    console.error("Error fetching stations:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createStation = async (req, res) => {
  try {
    const stationData = req.body;
    const isTaken = await stationService.isStationNameTaken(stationData.name);
    if (isTaken) {
      return res.status(401).json({ message: "Station's name already exists! Choose another one." });
    }
    const result = await stationService.createStation(stationData);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error adding station:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateStation = async (req, res) => {
  try {
    const stationId = req.params.id;
    const stationData = req.body;
    const isTaken = await stationService.isStationNameTaken(stationData.name, stationId);
    if (isTaken) {
      return res.status(401).json({ message: "Station's name already exists! Choose another one." });
    }
    const updatedstation = await stationService.updateStation(stationId, stationData);
    if (!updatedstation) {
      return res.status(404).json({ message: "station not found" });
    }
    res.status(200).json({ updatedstation, message: "station updated sucessfully!" });
  } catch (err) {
    console.error("Error updating station:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteStation = async (req, res) => {
  try {
    const stationId = req.params.id;
    const deleted = await stationService.deleteStation(stationId);
    if (!deleted) {
      return res.status(404).json({ message: "station not found" });
    }

    res.status(200).json({ message: "Deleted successfully!" });
  } catch (err) {
    console.error("Error deleting station:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
};
