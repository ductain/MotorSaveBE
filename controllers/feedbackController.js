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
    const feedback = await feedbackService.getFeedbackById(feedbackId)
    if (!feedback) {
      return res.status(404).json({ message: "feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getFeedbacks: getFeedbacks,
  getFeedbackById: getFeedbackById,
};