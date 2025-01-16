const driverVehicleService = require("../services/driverVehicleService");

const getDriverVehicles = async (req, res) => {
  try {
    const vehicles = await driverVehicleService.getDriverVehicles();
    res.status(200).json(vehicles);
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDriverVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await driverVehicleService.getDriverVehiclesById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getDriverVehicles: getDriverVehicles,
  getDriverVehicleById: getDriverVehicleById,
};
