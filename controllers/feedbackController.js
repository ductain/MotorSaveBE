const feedbackService = require("../services/feedbackService");

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackService.getFeedbacks();
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFeedbackById = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await feedbackService.getFeedbackById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createFeedback = async (req, res) => {
  try {
    const { requestdetailid } = req.params;
    const { rating, comment } = req.body;

    // Validate input
    if (!requestdetailid || !rating || !comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const feedback = await feedbackService.createFeedback(
      requestdetailid,
      rating,
      comment
    );
    res.status(201).json(feedback);
  } catch (error) {
    if (error.message === "Not found") {
      return res.status(404).json({ error: "Request detail not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTotalFeedbacks = async (req, res) => {
  try {
    const totalFeedbacks = await feedbackService.getTotalFeedbacks()
    return res.status(200).json({ totalFeedbacks });
  } catch (error) {
    console.error("Error fetching total feedbacks:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getFeedbacks: getFeedbacks,
  getFeedbackById: getFeedbackById,
  createFeedback: createFeedback,
  getTotalFeedbacks: getTotalFeedbacks,
};
