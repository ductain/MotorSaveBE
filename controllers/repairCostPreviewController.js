const repCosPreService = require("../services/repairCostPreviewService");

const getRepairCostPreviews = async (req, res) => {
    try {
        const repCosPreviews = await repCosPreService.getRepairCostPreviews();
        res.status(200).json(repCosPreviews);
    } catch (err) {
        console.error("Error fetching repaircostpreviews:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getRepairCostPreviewById = async (req, res) => {
    try {
        const repCosPreId = req.params.id;
        const repCosPreview = await repCosPreService.getRepairCostPreviewById(repCosPreId);
        if (!repCosPreview) {
            return res.status(404).json({ message: "Repair Cost Preview not found" });
        }
        res.status(200).json(repCosPreview);
    } catch (err) {
        console.error("Error fetching repaircostpreviews:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const createRepairCostPreview = async (req, res) => {
    try {
        const adminid = req.user.id;
        const repCosPreData = req.body;
        const isTaken = await repCosPreService.isRepCosPreNameTaken(repCosPreData.name);
        if (isTaken) {
            return res.status(401).json({ message: "Repair Cost Preview's name already exists! Choose another one." });
        }
        if (repCosPreData.min < 10000) {
            return res.status(402).json({ message: "The min cost must larger than 10000" });
        }
        if (repCosPreData.min >= repCosPreData.max) {
            return res.status(403).json({ message: "The max cost must be larger than min cost" });
        }
        const result = await repCosPreService.createRepairCostPreview(adminid, repCosPreData);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error adding repaircostpreview:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateRepairCostPreview = async (req, res) => {
    try {
        const adminid = req.user.id;
        const repCosPreId = req.params.id;
        const repCosPreData = req.body;
        const isTaken = await repCosPreService.isRepCosPreNameTaken(repCosPreData.name, repCosPreId);
        if (isTaken) {
            return res.status(401).json({ message: "Repair Cost Preview's name already exists! Choose another one." });
        }
        if (repCosPreData.min < 10000) {
            return res.status(402).json({ message: "The min cost must larger than 10000" });
        }
        if (repCosPreData.min >= repCosPreData.max) {
            return res.status(403).json({ message: "The max cost must be larger than min cost" });
        }
        const updatedRepCosPre = await repCosPreService.updateRepairCostPreview(adminid, repCosPreId, repCosPreData);
        if (!updatedRepCosPre) {
            return res.status(404).json({ message: "Repair Cost Preview not found" });
        }
        res.status(200).json({ updatedRepCosPre, message: "Repair Cost Preview updated!" });
    } catch (err) {
        console.error("Error updating repaircostpreview:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteRepairCostPreview = async (req, res) => {
    try {
        const repCosPreId = req.params.id;
        const deleted = await repCosPreService.deleteRepairCostPreview(repCosPreId);
        if (!deleted) {
            return res.status(404).json({ message: "Repair Cost Preview not found" });
        }

        res.status(200).json({ message: "Repair Cost Preview deleted!" });
    } catch (err) {
        console.error("Error deleting repaircostpreview:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getRepairCostPreviews,
    getRepairCostPreviewById,
    createRepairCostPreview,
    updateRepairCostPreview,
    deleteRepairCostPreview
}