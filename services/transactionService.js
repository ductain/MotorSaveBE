const query = require("../config/dbConfig");

const createTransaction = async (data) => {
  const {
    requestdetailid,
    zptransid,
    totalamount,
    paymentmethod,
    paymentstatus,
  } = data;

  try {
    const transactiondate = new Date();

    // Insert into Payments table first
    const paymentResult = await query(
      `INSERT INTO payments (totalamount, paymentmethod, paymentstatus, requestdetailid)
         VALUES ($1, $2, $3, $4) RETURNING id`,
      [totalamount, paymentmethod, paymentstatus, requestdetailid]
    );

    const paymentId = paymentResult.rows[0].id;

    // Insert into Transactions table
    const transactionResult = await query(
      `INSERT INTO transactions (requestdetailid, zptransid, paymentid, transactiondate)
         VALUES ($1, $2, $3, $4) RETURNING id`,
      [
        requestdetailid,
        zptransid,
        paymentId,
        transactiondate
      ]
    );

    const transactionId = transactionResult.rows[0].id;

    return {
      message: "Payment and transaction created successfully!",
      paymentId,
      transactionId,
      totalamount,
      paymentmethod,
      paymentstatus,
      transactiondate
    };
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

const getTotalRevenue = async () => {
  try {
    const result = await query(
      `SELECT COALESCE(SUM(totalamount), 0) AS totalRevenue 
       FROM payments 
       WHERE paymentstatus = 'Success' AND requestdetailid IS NOT NULL`
    );
    return result.rows[0].totalrevenue;
  } catch (error) {
    console.error("Error getting total revenue:", error);
    throw error;
  }
};

const getTotalRevenueByMonth = async (year) => {
  try {
    const result = await query(
      `SELECT 
        EXTRACT(MONTH FROM rd.createddate) AS month,
        COALESCE(SUM(p.totalamount), 0) AS totalRevenue
      FROM payments p
      JOIN requestdetails rd ON p.requestdetailid = rd.id
      WHERE p.paymentstatus = 'Success' 
        AND EXTRACT(YEAR FROM rd.createddate) = $1
      GROUP BY month
      ORDER BY month`,
      [year]
    );

    return result.rows;
  } catch (error) {
    console.error("Error getting total revenue by month:", error);
    throw error;
  }
};

const createPayment = async (data) => {
  const {
    requestdetailid,
    totalamount,
    paymentmethod,
    paymentstatus,
  } = data;

  try {
    const paymentResult = await query(
      `INSERT INTO payments (totalamount, paymentmethod, paymentstatus, requestdetailid)
         VALUES ($1, $2, $3, $4) RETURNING id`,
      [totalamount, paymentmethod, paymentstatus, requestdetailid]
    );

    return {
      message: "Payment created successfully!",
    };
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

const updatePaymentStatus = async (requestDetailId, newStatus) => {
  try {
    const foundPayment = await query(
      `SELECT * FROM payments
      WHERE requestdetailid = $1`
      , [requestDetailId]
    )
    console.log(foundPayment)
    if (foundPayment.rows.length > 0) {
      const result = await query(
        `UPDATE payments SET paymentstatus = $1
        WHERE requestdetailid = $2 RETURNING *`,
        [newStatus, requestDetailId]
      );
      return result.rows[0];
    }
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
};

const getUnpaidPaymentsByRequestId = async (requestId) => {
  const results = await query(
    `
    SELECT 
      p.id AS paymentid,
      p.paymentmethod,
      p.paymentstatus,
      p.totalamount,
      rd.id AS requestdetailid,
      rt.name,
      r.id AS requestid
    FROM payments p
    LEFT JOIN requestdetails rd ON rd.id = p.requestdetailid
    LEFT JOIN requesttypes rt ON rt.id = rd.requesttypeid
    LEFT JOIN requests r ON r.id = rd.requestid
    WHERE r.id = $1
    AND p.paymentstatus = 'Unpaid'
    `
    , [requestId]);
  return results.rows;
};

module.exports = {
  createTransaction: createTransaction,
  getTotalRevenue: getTotalRevenue,
  getTotalRevenueByMonth: getTotalRevenueByMonth,
  createPayment: createPayment,
  updatePaymentStatus,
  getUnpaidPaymentsByRequestId
};
