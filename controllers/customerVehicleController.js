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
    const { licensePlate, brandId } = req.body;
    const customerId = req.user.id; // Assuming req.user contains authenticated user info

    if (!licensePlate || !brandId) {
      return res.status(400).json({ message: "Missing required fields: licensePlate, brandId" });
    }

    const vehicle = await customerVehicleService.upsertCustomerVehicle({
      customerId,
      licensePlate,
      brandId,
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

const createGuestVehicle = async (req, res) => {
  try {
    const { licensePlate, brandId } = req.body;

    if (!licensePlate || !brandId) {
      return res.status(400).json({ message: "Missing required fields: licensePlate, brandId" });
    }

    const vehicle = await customerVehicleService.createGuestVehicle({
      licensePlate,
      brandId,
    });

    if (!vehicle) {
      return res.status(500).json({ message: "Failed to create vehicle" });
    }

    res.status(200).json(vehicle);
  } catch (err) {
    console.error("Error creating/updating customer vehicle:", err);
    res.status(500).json({ message: "Failed to create customer vehicle", error: err.message });
  }
};

const updateRequestVehicle = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { vehicleId } = req.body;

    const updatedRequest = await customerVehicleService.updateRequestVehicle(
      requestId,
      vehicleId
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      message: "Request vehicle updated successfully!",
      request: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getCustomerVehicles,
  getCustomerVehicleById,
  getVehiclesByCustomerId,
  upsertCustomerVehicle,
  createGuestVehicle,
  updateRequestVehicle,
};
