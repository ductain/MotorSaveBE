const distanceService = require("../services/distanceService");

const calculateMoney = async (req, res) => {
  try {
    const { distance, serpacrate, waiting } = req.query;

    if (!serpacrate) {
      return res.status(404).json({ message: "Service package rate not identified" });
    }
    if (!distance || distance < 0) {
      return res.status(400).json({ message: "Invalid distance input" });
    }

    const totalMoney = await distanceService.calculateMoney(distance,serpacrate, waiting);
    res.status(201).json({ totalMoney });
  } catch (err) {
    console.error("Error calculating money:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDistanceRate = async (req, res) => {
  try {
    const distanceRates = await distanceService.getDistanceRates();
    res.status(200).json(distanceRates);
  } catch (err) {
    console.error("Error fetching distancerate:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateDistanceRate = async (req, res) => {
  try {
    const adminId = req.user.id;
    const disRateId = req.params.id;
    const disRateData = req.body;
    const updatedDisRate = await distanceService.updateDistanceRate(disRateId, disRateData, adminId);
    if (!updatedDisRate) {
      return res.status(404).json({ message: "DistanceRate not found" });
    }
    res.status(200).json({ updatedDisRate, message: "Distance Rate updated!" });
  } catch (err) {
    console.error("Error updating distancerate:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const calculateFloodFare = async (req, res) => {
  try {
    const { distance, waiting } = req.query;

    if (!distance || distance < 0) {
      return res.status(400).json({ message: "Invalid distance input" });
    }

    const totalMoney = await distanceService.calculateFloodFare(distance, waiting);
    res.status(201).json({ totalMoney });
  } catch (err) {
    console.error("Error calculating money:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  calculateMoney,
  getDistanceRate,
  updateDistanceRate,
  calculateFloodFare,
};
