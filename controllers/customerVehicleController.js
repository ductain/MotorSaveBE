const customerVehicleService = require("../services/customerVehicleService");

const getCustomerVehicles = async (req, res) => {
  try {
    const vehicles = await customerVehicleService.getCustomerVehicles();
    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({ message: "No vehicles found" });
    }
    res.status(200).json(vehicles);
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(500).json({ message: "Failed to fetch vehicles", error: err.message });
  }
};

const getCustomerVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await customerVehicleService.getCustomerVehiclesById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: `Vehicle with ID ${vehicleId} not found` });
    }

    res.status(200).json(vehicle);
  } catch (err) {
    console.error(`Error fetching vehicle with ID ${req.params.id}:`, err);
    res.status(500).json({ message: "Failed to fetch vehicle", error: err.message });
  }
};

const getVehiclesByCustomerId = async (req, res) => {
  try {
    const customerId = req.user.id;
    const vehicles = await customerVehicleService.getVehiclesByCustomerId(customerId);

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({ message: `No vehicles found for customer ID ${customerId}` });
    }

    res.status(200).json(vehicles);
  } catch (err) {
    console.error(`Error fetching vehicles for customer ID ${req.user.id}:`, err);
    res.status(500).json({ message: "Failed to fetch customer vehicles", error: err.message });
  }
};

const upsertCustomerVehicle = async (req, res) => {
  try {
    const { licensePlate, modelId } = req.body;
    const customerId = req.user.id; // Assuming req.user contains authenticated user info

    if (!licensePlate || !modelId) {
      return res.status(400).json({ message: "Missing required fields: licensePlate, modelId" });
    }

    const vehicle = await customerVehicleService.upsertCustomerVehicle({
      customerId,
      licensePlate,
      modelId,
    });

    if (!vehicle) {
      return res.status(500).json({ message: "Failed to upsert vehicle" });
    }

    res.status(200).json(vehicle);
  } catch (err) {
    console.error("Error inserting/updating customer vehicle:", err);
    res.status(500).json({ message: "Failed to upsert customer vehicle", error: err.message });
  }
};

module.exports = {
  getCustomerVehicles,
  getCustomerVehicleById,
  getVehiclesByCustomerId,
  upsertCustomerVehicle
};
