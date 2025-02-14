const distanceService = require("../services/distanceService");

const calculateMoney = async (req, res) => {
  try {
    const { distance } = req.query;

    if (!distance || distance < 0) {
      return res.status(400).json({ message: "Invalid distance input" });
    }

    const totalMoney = await distanceService.calculateMoney(distance);
    res.status(201).json({ totalMoney });
  } catch (err) {
    console.error("Error calculating money:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  calculateMoney,
};
