const customerVehicleService = require("../services/customerVehicleService");

const getCustomerVehicles = async (req, res) => {
  try {
    const vehicles = await customerVehicleService.getCustomerVehicles();
    res.status(200).json(vehicles);
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCustomerVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await customerVehicleService.getCustomerVehiclesById(
      vehicleId
    );
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
  getCustomerVehicles: getCustomerVehicles,
  getCustomerVehicleById: getCustomerVehicleById,
};
