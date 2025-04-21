const vehicleModelService = require("../services/vehicleModelService");

const getModels = async (req, res) => {
  try {
    const models = await vehicleModelService.getModels();
    res.status(200).json(models);
  } catch (err) {
    console.error("Error fetching vehiclemodels:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getModelById = async (req, res) => {
  try {
    const modelId = req.params.id;
    const model = await vehicleModelService.getModelById(modelId);
    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.status(200).json(model);
  } catch (err) {
    console.error("Error fetching vehiclemodels:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createModel = async (req, res) => {
  try {
    const modelData = req.body;
    const isTaken = await vehicleModelService.isModelNameTaken(modelData.name);
    if (isTaken) {
      return res.status(401).json({ message: "Model name already exists! Choose another one." });
    }
    const result = await vehicleModelService.createModel(modelData);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error adding vehicle model:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateModel = async (req, res) => {
  try {
    const modelId = req.params.id;
    const modelData = req.body;
    const isTaken = await vehicleModelService.isModelNameTaken(modelData.name, modelId);
    if (isTaken) {
      return res.status(401).json({ message: "Model name already exists! Choose another one." });
    }
    const updatedModel = await vehicleModelService.updateModel(modelId, modelData);
    if (!updatedModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.status(200).json({ updatedModel, message: "Model updated!" });
  } catch (err) {
    console.error("Error updating vehicle model:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteModel = async (req, res) => {
  try {
    const modelId = req.params.id;
    const deleted = await vehicleModelService.deleteModel(modelId);
    if (!deleted) {
      return res.status(404).json({ message: "Model not found" });
    }

    res.status(200).json({ message: "Model deleted!" });
  } catch (err) {
    console.error("Error deleting vehicle model:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel,
};