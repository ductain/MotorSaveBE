const serPackageService = require("../services/serPackageService");

const getSerPackages = async (req, res) => {
  try {
    const serPackages = await serPackageService.getSerPackgages();
    res.status(200).json(serPackages);
  } catch (err) {
    console.error("Error fetching servicepackage:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSerPacById = async (req, res) => {
  try {
    const serPacId = req.params.id;
    const serPackage = await serPackageService.getSerPacById(serPacId);
    if (!serPackage) {
      return res.status(404).json({ message: "Service Package not found" });
    }
    res.status(200).json(serPackage);
  } catch (err) {
    console.error("Error fetching servicepackage:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createSerPackage = async (req, res) => {
  try {
    const serPacData = req.body;
    const isTaken = await serPackageService.isSerPacNameTaken(serPacData.name);
    if (isTaken) {
      return res.status(401).json({ message: "Service Package's name already exists! Choose another one." });
    }
    const result = await serPackageService.createSerPackage(serPacData);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error adding servicepackage:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateSerPackage = async (req, res) => {
  try {
    const serPacId = req.params.id;
    const serPacData = req.body;
    const isTaken = await serPackageService.isSerPacNameTaken(serPacData.name, serPacId);
    if (isTaken) {
      return res.status(401).json({ message: "Service Package's name already exists! Choose another one." });
    }
    const updatedSerPackage = await serPackageService.updateSerPackage(serPacId, serPacData);
    if (!updatedSerPackage) {
      return res.status(404).json({ message: "Service Package not found" });
    }
    res.status(200).json({ updatedSerPackage, message: "Service Package updated!" });
  } catch (err) {
    console.error("Error updating servicepackage:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteSerPackage = async (req, res) => {
  try {
    const serPacId = req.params.id;
    const deleted = await serPackageService.deleteSerPackage(serPacId);
    if (!deleted) {
      return res.status(404).json({ message: "Service Package not found" });
    }

    res.status(200).json({ message: "Service Package deleted!" });
  } catch (err) {
    console.error("Error deleting servicepackage:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
    getSerPackages,
    getSerPacById,
    createSerPackage,
    updateSerPackage,
    deleteSerPackage
}