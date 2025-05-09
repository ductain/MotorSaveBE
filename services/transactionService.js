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
      [requestdetailid, zptransid, paymentId, transactiondate]
    );

    const transactionId = transactionResult.rows[0].id;

    return {
      message: "Payment and transaction created successfully!",
      paymentId,
      transactionId,
      totalamount,
      paymentmethod,
      paymentstatus,
      transactiondate,
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

const getTotalRevenueByDate = async (year, month) => {
  try {
    const result = await query(
      `SELECT 
        DATE(rd.createddate) AS date,
        COALESCE(SUM(p.totalamount), 0) AS totalRevenue
      FROM payments p
      JOIN requestdetails rd ON p.requestdetailid = rd.id
      WHERE p.paymentstatus = 'Success' 
        AND EXTRACT(YEAR FROM rd.createddate) = $1
        AND EXTRACT(MONTH FROM rd.createddate) = $2
      GROUP BY date
      ORDER BY date`,
      [year, month]
    );

    return result.rows;
  } catch (error) {
    console.error("Error getting total revenue by date:", error);
    throw error;
  }
};

const getStaffRevenue = async (staffid, year, month) => {
  const results = await query(
    `
    SELECT 
      DATE(rd.updateddate) AS day,
      SUM(p.totalamount) AS totalrevenue
    FROM payments p
    JOIN requestdetails rd ON p.requestdetailid = rd.id
    JOIN accounts acc ON rd.staffid = acc.id
    JOIN roles r ON acc.roleid = r.id
    WHERE p.paymentstatus = 'Success'
      AND acc.id = $1
      AND EXTRACT(YEAR FROM rd.updateddate) = $2
      AND EXTRACT(MONTH FROM rd.updateddate) = $3
      AND r.name IN ('Driver', 'Mechanic')
    GROUP BY DATE(rd.updateddate)
    ORDER BY day ASC
    `,
    [staffid, year, month]
  );
  return results.rows;
};

const createPayment = async (data) => {
  const { requestdetailid, totalamount, paymentmethod, paymentstatus } = data;

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
      WHERE requestdetailid = $1`,
      [requestDetailId]
    );
    console.log(foundPayment);
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

const updatePaymentTotal = async (requestDetailId, newTotal) => {
  try {
    const updatedDate = new Date();
    const foundPayment = await query(
      `SELECT * FROM payments
      WHERE requestdetailid = $1`,
      [requestDetailId]
    );
    console.log(foundPayment);
    if (foundPayment.rows.length > 0) {
      const result1 = await query(
        `UPDATE payments SET totalamount = $1
        WHERE requestdetailid = $2 RETURNING *`,
        [newTotal, requestDetailId]
      );
      if (result1.rowCount > 0) {
        const result2 = await query(
          `UPDATE requestdetails 
          SET totalprice = $1, updateddate = $2
          WHERE id = $3
          RETURNING *`,
          [newTotal, updatedDate, requestDetailId]
        );
        return result2.rows[0];
      }
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
    `,
    [requestId]
  );
  return results.rows;
};
const updatePaymentInfo = async (requestDetailId, data) => {
  const { paymentmethod, paymentstatus } = data;
  try {
    const foundPayment = await query(
      `SELECT * FROM payments
      WHERE requestdetailid = $1`,
      [requestDetailId]
    );
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

const getPayments = async () => {
  const results = await query(`
    SELECT 
      p.id AS paymentid,
      rd.requestid,
      rd.id AS requestdetailid,
      rd.requeststatus,
      rd.updateddate,
      p.requestdetailid,
      p.paymentmethod,
      p.paymentstatus,
      p.totalamount,
      t.id AS transactionid,
      rt.name AS requesttype,
      a.fullname AS customername, 
      a.phone AS customerphone, 
      t.transactiondate
    FROM payments p
    LEFT JOIN requestdetails rd ON rd.id = p.requestdetailid
    JOIN requests r ON r.id = rd.requestid
    JOIN accounts a ON r.customerid = a.id
    LEFT JOIN transactions t ON t.paymentid = p.id
    LEFT JOIN requesttypes rt ON rt.id = rd.requesttypeid
    WHERE p.requestdetailid IS NOT NULL
    AND rd.requeststatus <> 'Cancel'
    ORDER BY rd.updateddate DESC`);
  return results.rows;
};

const getPaymentsByCustomer = async (customerId) => {
  const results = await query(`
    SELECT 
      p.id AS paymentid,
      rd.requestid,
      rd.id AS requestdetailid,
      sp.name AS servicepackagename,
      rt.name AS requestypename,
      rd.requeststatus,
      rd.updateddate,
      p.requestdetailid,
      p.paymentmethod,
      p.paymentstatus,
      p.totalamount,
      t.id AS transactionid,
      t.transactiondate
    FROM payments p
    LEFT JOIN requestdetails rd ON rd.id = p.requestdetailid
    JOIN requests r ON r.id = rd.requestid
    LEFT JOIN servicepackages sp ON sp.id = r.servicepackageid
    JOIN accounts a ON r.customerid = a.id
    LEFT JOIN transactions t ON t.paymentid = p.id
    LEFT JOIN requesttypes rt ON rt.id = rd.requesttypeid
    WHERE a.id = $1
    AND p.requestdetailid IS NOT NULL
    AND rd.requeststatus <> 'Cancel'
    ORDER BY rd.updateddate DESC
    LIMIT 25`,
  [customerId]);
  return results.rows;
};

const getStaffPerformance = async (date) => {
  const results = await query(
    `
    SELECT 
  acc.id AS staffid,
  acc.fullname AS staffname,
  acc.phone AS staffphone,
  r.name AS role,
  $1::date AS day,
  COUNT(rd.id) FILTER (WHERE DATE(rd.updateddate) = $1) AS requestcount,
  COALESCE(SUM(p.totalamount) FILTER (WHERE DATE(rd.updateddate) = $1), 0) AS totalearned
FROM accounts acc
JOIN roles r ON acc.roleid = r.id
LEFT JOIN requestdetails rd ON rd.staffid = acc.id
LEFT JOIN payments p ON p.requestdetailid = rd.id AND p.paymentstatus = 'Success'
WHERE r.name IN ('Driver', 'Mechanic')
GROUP BY acc.id, acc.fullname, acc.phone, r.name
ORDER BY totalearned DESC
    `,
    [date]
  );

  return results.rows;
};

module.exports = {
  createTransaction: createTransaction,
  getTotalRevenue: getTotalRevenue,
  getTotalRevenueByDate: getTotalRevenueByDate,
  createPayment: createPayment,
  updatePaymentStatus,
  updatePaymentTotal,
  getUnpaidPaymentsByRequestId,
  updatePaymentInfo,
  getPayments,
  getPaymentsByCustomer,
  getStaffPerformance,
  getStaffRevenue,
};
