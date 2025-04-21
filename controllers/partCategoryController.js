const parCatService = require("../services/partcategoryService");

const getPartCategories = async (req, res) => {
  try {
    const parCats = await parCatService.getPartCategories();
    res.status(200).json(parCats);
  } catch (err) {
    console.error("Error fetching partcategories:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getParCatById = async (req, res) => {
  try {
    const parCatId = req.params.id;
    const parCat = await parCatService.getParCatById(parCatId);
    if (!parCat) {
      return res.status(404).json({ message: "Part Category not found" });
    }
    res.status(200).json(parCat);
  } catch (err) {
    console.error("Error fetching partcategories:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createParCat = async (req, res) => {
  try {
    const parCatData = req.body;
    const isTaken = await parCatService.isParCatNameTaken(parCatData.name);
    if (isTaken) {
      return res.status(401).json({ message: "Part Category name already exists! Choose another one." });
    }
    const result = await parCatService.createParCat(parCatData);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error adding part category:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateParCat = async (req, res) => {
  try {
    const parCatId = req.params.id;
    const parCatData = req.body;
    const isTaken = await parCatService.isParCatNameTaken(parCatData.name, parCatId);
    if (isTaken) {
      return res.status(401).json({ message: "Part Category already exists! Choose another one." });
    }
    const updatedParCat = await parCatService.updateParCat(parCatId, parCatData);
    if (!updatedParCat) {
      return res.status(404).json({ message: "Part Category not found" });
    }
    res.status(200).json({ updatedParCat, message: "Part Category updated!" });
  } catch (err) {
    console.error("Error updating part category:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteParCat = async (req, res) => {
  try {
    const parCatId = req.params.id;
    const deleted = await parCatService.deleteParCat(parCatId);
    if (!deleted) {
      return res.status(404).json({ message: "Part Category not found" });
    }

    res.status(200).json({ message: "Part Category deleted!" });
  } catch (err) {
    console.error("Error deleting part category:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getPartCategories,
  getParCatById,
  createParCat,
  updateParCat,
  deleteParCat,
};