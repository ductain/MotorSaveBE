const accessoryService = require("../services/accessoryService");

const getAccessories = async (req, res) => {
  try {
    const accessories = await accessoryService.getAccessories();
    res.status(200).json(accessories);
  } catch (err) {
    console.error("Error fetching accessories:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAccessoriesByBrandId = async (req, res) => {
  try {
    const brandId = req.params.brandId;
    const accessories = await accessoryService.getAccessoriesByBrandId(brandId);
    res.status(200).json(accessories);
  } catch (err) {
    console.error("Error fetching accessories:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAccessoriesByParCatId = async (req, res) => {
  try {
    const parCatId = req.params.parCatId;
    const accessories = await accessoryService.getAccessoriesByParCatId(parCatId);
    res.status(200).json(accessories);
  } catch (err) {
    console.error("Error fetching accessories:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAcsrByParCatIdAndBrandId = async (req, res) => {
  try {
    const { parCatId, brandId } = req.query;
    const accessories = await accessoryService.getAcsrByParCatIdAndBrandId(parCatId, brandId);
    res.status(200).json(accessories);
  } catch (err) {
    console.error("Error fetching accessories:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAccessoryById = async (req, res) => {
  try {
    const accessoryId = req.params.id;
    const accessory = await accessoryService.getAccessoryById(accessoryId);
    if (!accessory) {
      return res.status(404).json({ message: "Accessory not found" });
    }
    res.status(200).json(accessory);
  } catch (err) {
    console.error("Error fetching accessory:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createAccessory = async (req, res) => {
  try {
    const accessoryData = req.body;
    const isTaken = await accessoryService.isAccessoryNameTaken(accessoryData.name);
    if (isTaken) {
      return res.status(401).json({ message: "Accessory name already exists! Choose another one." });
    }
    const result = await accessoryService.createAccessory(accessoryData);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error adding accessory:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAccessory = async (req, res) => {
  try {
    const accessoryId = req.params.id;
    const accessoryData = req.body;
    const isTaken = await accessoryService.isAccessoryNameTaken(accessoryData.name, accessoryId);
    if (isTaken) {
      return res.status(401).json({ message: "Accessory name already exists! Choose another one." });
    }
    const updatedAccessory = await accessoryService.updateAccessory(modelId, modelData);
    if (!updatedAccessory) {
      return res.status(404).json({ message: "Accessory not found" });
    }
    res.status(200).json({ updatedAccessory, message: "Accessory updated!" });
  } catch (err) {
    console.error("Error updating accessory:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAccessory = async (req, res) => {
  try {
    const accessoryId = req.params.id;
    const deleted = await accessoryService.deleteAccessory(accessoryId);
    if (!deleted) {
      return res.status(404).json({ message: "Accessory not found" });
    }

    res.status(200).json({ message: "Accessory deleted!" });
  } catch (err) {
    console.error("Error deleting accessory:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAccessories,
  getAccessoriesByBrandId,
  getAccessoriesByParCatId,
  getAcsrByParCatIdAndBrandId,
  getAccessoryById,
  createAccessory,
  updateAccessory,
  deleteAccessory,
};