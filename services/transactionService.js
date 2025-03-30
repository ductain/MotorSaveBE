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

const updatePaymentInfo = async (requestDetailId, data) => {
  const {
    paymentmethod,
    paymentstatus,
  } = data;
  try {
    const foundPayment = await query(
      `SELECT * FROM payments
      WHERE requestdetailid = $1`
      , [requestDetailId]
    )
    if (foundPayment.rows.length > 0) {
      const result = await query(
        `UPDATE payments SET paymentstatus = $1, paymentmethod = $2
        WHERE requestdetailid = $3 RETURNING *`,
        [paymentstatus, paymentmethod, requestDetailId]
      );
      return result.rows[0];
    }
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
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
