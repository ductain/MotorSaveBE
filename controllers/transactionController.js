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

const getTotalRevenueByDate = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || isNaN(year) || !month || isNaN(month)) {
      return res.status(400).json({ message: "Invalid year or month parameter" });
    }

    const totalRevenueByDate = await transactionService.getTotalRevenueByDate(Number(year), Number(month));

    return res.status(200).json({ totalRevenueByDate });
  } catch (error) {
    console.error("Error fetching total revenue by date:", error);
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
    const { requestDetailId, newStatus } = req.body;
    const result = await transactionService.updatePaymentStatus(requestDetailId, newStatus);
    if (result) res.status(200).json(result);
    else res.status(404).json('Payment not found');
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updatePaymentTotal = async (req, res) => {
  try {
    const { requestDetailId, newTotal } = req.body;
    const result = await transactionService.updatePaymentTotal(requestDetailId, newTotal);
    if (result) res.status(200).json(result);
    else res.status(404).json('Payment not found');
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getUnpaiPaymentsByRequestId = async (req, res) => {
  try {
    const requestId = req.params.id;
    const foundPayments = await transactionService.getUnpaidPaymentsByRequestId(requestId);
    res.status(200).json(foundPayments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updatePaymentInfo = async (req, res) => {
  try {
    const { requestdetailid } = req.params
    const result = await transactionService.updatePaymentInfo(requestdetailid, req.body);
    if (result) res.status(200).json(result);
    else res.status(404).json('Payment not found');
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await transactionService.getPayments();
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPaymentsByCustomer = async (req, res) => {
  try {
    const customerid = req.user.id;
    const payments = await transactionService.getPaymentsByCustomer(customerid);
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getStaffPerformance = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Missing required 'date' parameter" });
    }

    const performance = await transactionService.getStaffPerformance(date);
    res.status(200).json(performance);
  } catch (err) {
    console.error("Error fetching performance:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getStaffRevenue = async (req, res) => {
  try {
    const { staffid, year, month } = req.query;
    if (!staffid || !year || !month) {
      return res.status(400).json({ message: "Missing staffid, year, or month" });
    }

    const revenue = await transactionService.getStaffRevenue(staffid, year, month);
    res.status(200).json(revenue);
  } catch (err) {
    console.error("Error fetching revenue:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTransaction: createTransaction,
  getTotalRevenue: getTotalRevenue,
  getTotalRevenueByDate: getTotalRevenueByDate,
  createPayment: createPayment,
  updatePaymentStatus,
  updatePaymentTotal,
  getUnpaiPaymentsByRequestId,
  updatePaymentInfo,
  getPayments,
  getPaymentsByCustomer,
  getStaffPerformance,
  getStaffRevenue,
};
