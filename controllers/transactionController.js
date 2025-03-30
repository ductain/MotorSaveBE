const transactionService = require("../services/transactionService");

const createTransaction = async (req, res) => {
  try {
    const result = await transactionService.createTransaction(req.body);
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await transactionService.getTotalRevenue();
    return res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTotalRevenueByMonth = async (req, res) => {
  try {
    const { year } = req.params;
    
    if (!year || isNaN(year)) {
      return res.status(400).json({ message: "Invalid year parameter" });
    }

    const totalRevenueByMonth = await transactionService.getTotalRevenueByMonth(year);
    
    return res.status(200).json({ totalRevenueByMonth });
  } catch (error) {
    console.error("Error fetching total revenue by month:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createPayment = async (req, res) => {
  try {
    const result = await transactionService.createPayment(req.body);
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const {requestDetailId, newStatus} = req.body;
    const result = await transactionService.updatePaymentStatus(requestDetailId, newStatus);
    if(result) res.status(200).json(result);
    else res.status(404).json('Payment not found');
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updatePaymentInfo = async (req, res) => {
  try {
    const {requestdetailid} = req.params
    const result = await transactionService.updatePaymentInfo(requestdetailid, req.body);
    if(result) res.status(200).json(result);
    else res.status(404).json('Payment not found');
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};



module.exports = {
  createTransaction: createTransaction,
  getTotalRevenue: getTotalRevenue,
  getTotalRevenueByMonth: getTotalRevenueByMonth,
  createPayment: createPayment,
  updatePaymentStatus,
  updatePaymentInfo,
};
