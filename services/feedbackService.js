const query = require("../config/dbConfig");

const getFeedbacks = async () => {
  const results = await query("SELECT * FROM feedbacks");
  return results.rows;
};

const getFeedbackById = async (feedbackId) => {
  const results = await query(`SELECT * FROM feedbacks WHERE id = $1`, [
    feedbackId,
  ]);
  return results.rows[0];
};

module.exports = {
  getFeedbacks: getFeedbacks,
  getFeedbackById: getFeedbackById,
};
