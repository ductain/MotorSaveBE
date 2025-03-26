const query = require("../config/dbConfig");

const getFeedbacks = async () => {
  try {
    const result = await query(
      `SELECT 
        -- Feedback Information
        f.id AS feedbackid,
        f.rating,
        f.comment,
        f.createddate,
        
        -- Customer Information
        c.fullname AS customername,
        c.phone AS customerphone,
        
        -- Request Information
        r.id AS requestid,
        rt.name AS requesttype,
        sp.name AS servicepackagename
        
      FROM feedbacks f
      JOIN requestdetails rd ON f.requestdetailid = rd.id
      JOIN requests r ON rd.requestid = r.id
      JOIN servicepackages sp ON r.servicepackageid = sp.id
      JOIN accounts c ON r.customerid = c.id
      JOIN requesttypes rt ON rd.requesttypeid = rt.id
      
      ORDER BY f.createddate DESC`
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
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
