const requestTypeService = require("../services/requestTypeService");

const getRequestTypes = async (req, res) => {
  try {
    const requestTypes = await requestTypeService.getRequestTypes();
    res.status(200).json(requestTypes);
  } catch (err) {
    console.error("Error fetching requestTypes:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRequestTypeById = async (req, res) => {
  try {
    const reqTypeId = req.params.id;
    const requestType = await requestTypeService.getRequestTypeById(reqTypeId);
    if (!requestType) {
      return res.status(404).json({ message: "RequestType not found" });
    }
    res.status(200).json(requestType);
  } catch (err) {
    console.error("Error fetching requestTypes:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createRequestType = async (req, res) => {
  try {
    const reqTypeData = req.body;
    const isTaken = await requestTypeService.isRequestTypeTaken(reqTypeData.name);
    if (isTaken) {
      return res.status(401).json({ message: "RequestType name already exists! Choose another one." });
    }
    const result = await requestTypeService.createRequestType(reqTypeData);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error adding requestType:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateRequestType = async (req, res) => {
  try {
    const reqTypeId = req.params.id;
    const reqTypeData = req.body;
    const isTaken = await requestTypeService.isRequestTypeTaken(reqTypeData.name, reqTypeId);
    if (isTaken) {
      return res.status(401).json({ message: "RequestType name already exists! Choose another one." });
    }
    const updatedRequestType = await requestTypeService.updateRequestType(reqTypeId, reqTypeData);
    if (!updatedRequestType) {
      return res.status(404).json({ message: "RequestType not found" });
    }
    res.status(200).json({ updatedRequestType, message: "RequestType updated!" });
  } catch (err) {
    console.error("Error updating requestType:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRequestType = async (req, res) => {
  try {
    const reqTypeId = req.params.id;
    const deleted = await requestTypeService.deleteRequestType(reqTypeId);
    if (!deleted) {
      return res.status(404).json({ message: "RequestType not found" });
    }

    res.status(200).json({ message: "RequestType deleted!" });
  } catch (err) {
    console.error("Error deleting requestType:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getRequestTypes,
  getRequestTypeById,
  createRequestType,
  updateRequestType,
  deleteRequestType
}