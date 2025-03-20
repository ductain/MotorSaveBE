const repQuoteService = require("../services/repairQuoteService");

const getRepairQuotes = async (req, res) => {
    try {
        const repairQuotes = await repQuoteService.getRepairQuotes();
        res.status(200).json(repairQuotes);
    } catch (err) {
        console.error("Error fetching repairquote:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getRepairQuotesByRequestDetailId = async (req, res) => {
    try {
        const requestDetailId = req.params.requestDetailId;
        const repairQuotes = await repQuoteService.getRepairQuotesByRequestDetailId(requestDetailId);
        res.status(200).json(repairQuotes);
    } catch (err) {
        console.error("Error fetching repairquote:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getRepairQuoteById = async (req, res) => {
    try {
        const repQuoteId = req.params.id;
        const repairQuote = await repQuoteService.getRepairQuoteById(repQuoteId);
        if (!repairQuote) {
            return res.status(404).json({ message: "Repair Quote not found" });
        }
        res.status(200).json(repairQuote);
    } catch (err) {
        console.error("Error fetching repairquote:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const createRepairQuote = async (req, res) => {
    try {
        const repQuoteData = req.body;
        const result = await repQuoteService.createRepairQuote(repQuoteData);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error adding repairquote:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateRepairQuote = async (req, res) => {
    try {
        const staffId = req.user.id;
        const repQuoteId = req.params.id;
        const repQuoteData = req.body;
        const isThisStaff = await repQuoteService.checkStaff(repQuoteId, staffId);
        if (!isThisStaff) {
            return res.status(401).json({ message: "You are not allowed to edit this!" });
        }
        const updatedReqQuote = await repQuoteService.updateRepairQuote(repQuoteId, repQuoteData);
        if (!updatedReqQuote) {
            return res.status(404).json({ message: "Repair Quote not found" });
        }
        res.status(200).json({ updatedReqQuote, message: "Repair Quote updated!" });
    } catch (err) {
        console.error("Error updating repairquote:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteRepairQuote = async (req, res) => {
    try {
        const repQuoteId = req.params.id;
        const deleted = await repQuoteService.deleteRepairQuote(repQuoteId);
        if (!deleted) {
            return res.status(404).json({ message: "Repair Quote not found" });
        }
        res.status(200).json({ message: "Repair Quote deleted!" });
    } catch (err) {
        console.error("Error deleting repairquote:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getRepairQuotes,
    getRepairQuotesByRequestDetailId,
    getRepairQuoteById,
    createRepairQuote,
    updateRepairQuote,
    deleteRepairQuote
}