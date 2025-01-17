const vehiceTypeService = require("../services/vehicleTypeService");

const getVehicleTypes = async (req, res) => {
  try {
    const vehicleTypes = await vehiceTypeService.getVehicleTypes();
    res.status(200).json(vehicleTypes);
  } catch (err) {
    console.error("Error fetching vehicleTypes:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getVehicleTypeById = async (req, res) => {
  try {
    const vehicleTypeId = req.params.id;
    const vehicleType = await vehiceTypeService.getVehicleTypeById(vehicleTypeId);
    if (!vehicleType) {
      return res.status(404).json({ message: "VehicleType not found" });
    }
    res.status(200).json(vehicleType);
  } catch (err) {
    console.error("Error fetching vehicleTypes:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createVehicleType = async (req, res) => {
  try {
    const vehicleTypeData = req.body;
    const isTaken = await vehiceTypeService.isVehicleTypeTaken(vehicleTypeData.name);
    if (isTaken) {
      return res.status(401).json({ message: "VehicleType name already exists! Choose another one." });
    }
    const result = await vehiceTypeService.createVehicleType(vehicleTypeData);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error adding vehicleType:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateVehicleType = async (req, res) => {
  try {
    const vehicleTypeId = req.params.id;
    const vehicleTypeData = req.body;
    const isTaken = await vehiceTypeService.isVehicleTypeTaken(vehicleTypeData.name, vehicleTypeId);
    if (isTaken) {
      return res.status(401).json({ message: "VehicleType name already exists! Choose another one." });
    }
    const updatedVehicleType = await vehiceTypeService.updateVehicleType(vehicleTypeId, vehicleTypeData);
    if (!updatedVehicleType) {
      return res.status(404).json({ message: "vehicleType not found" });
    }
    res.status(200).json({ updatedVehicleType, message: "vehicleType updated!" });
  } catch (err) {
    console.error("Error updating vehicleType:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteVehicleType = async (req, res) => {
  try {
    const vehicleTypeId = req.params.id;
    const deleted = await vehiceTypeService.deleteVehicleType(vehicleTypeId);
    if (!deleted) {
      return res.status(404).json({ message: "vehicleType not found" });
    }

    res.status(200).json({ message: "vehicleType deleted!" });
  } catch (err) {
    console.error("Error deleting vehicleType:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getVehicleTypes,
  getVehicleTypeById,
  createVehicleType,
  updateVehicleType,
  deleteVehicleType
}