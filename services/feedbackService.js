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

const createFeedback = async (requestDetailId, rating, comment) => {
  try {
    // Check if requestdetailid exists
    const requestExists = await query(
      "SELECT id FROM requestdetails WHERE id = $1",
      [requestDetailId]
    );

    if (requestExists.rowCount === 0) {
      throw new Error("Not found");
    }

    // Insert feedback
    const result = await query(
      `INSERT INTO feedbacks (requestdetailid, rating, comment, createddate, updateddate) 
       VALUES ($1, $2, $3, NOW(), NOW()) 
       RETURNING *`,
      [requestDetailId, rating, comment]
    );

    return result.rows[0]; // Return newly created feedback
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getFeedbacks: getFeedbacks,
  getFeedbackById: getFeedbackById,
  createFeedback: createFeedback,
};
