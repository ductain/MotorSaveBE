const brandService = require("../services/brandService");

const getBrands = async (req, res) => {
  try {
    const brands = await brandService.getBrands();
    res.status(200).json(brands);
  } catch (err) {
    console.error("Error fetching brands:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;
    const brand = await brandService.getBrandById(brandId);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (err) {
    console.error("Error fetching brands:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createBrand = async (req, res) => {
  try {
    const brandData = req.body;
    const isTaken = await brandService.isBrandNameTaken(brandData.name);
    if (isTaken) {
      return res.status(401).json({ message: "Brand name already exists! Choose another one." });
    }
    const result = await brandService.createBrand(brandData);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error adding brand:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const brandData = req.body;
    const isTaken = await brandService.isBrandNameTaken(brandData.name, brandId);
    if (isTaken) {
      return res.status(401).json({ message: "Brand name already exists! Choose another one." });
    }
    const updatedBrand = await brandService.updateBrand(brandId, brandData);
    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ updatedBrand, message: "Brand updated!" });
  } catch (err) {
    console.error("Error updating brand:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const deleted = await brandService.deleteBrand(brandId);
    if (!deleted) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand deleted!" });
  } catch (err) {
    console.error("Error deleting brand:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
}