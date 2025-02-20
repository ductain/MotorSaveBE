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
      `INSERT INTO payments (totalamount, paymentmethod, paymentstatus)
         VALUES ($1, $2, $3) RETURNING id`,
      [totalamount, paymentmethod, paymentstatus]
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

module.exports = {
  createTransaction: createTransaction,
};
