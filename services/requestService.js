const query = require("../config/dbConfig");

const createRescueRequest = async (data, customerId) => {
  const {
    pickuplong,
    pickuplat,
    deslng,
    deslat,
    pickuplocation,
    destination,
    totalprice,
  } = data;

  try {
    // Fetch the servicePackageId for "Cứu hộ thường"
    const servicePackageResult = await query(
      `SELECT id FROM servicepackages WHERE name = 'Cứu hộ thường'`
    );

    if (servicePackageResult.rows.length === 0) {
      throw new Error("Service package 'Cứu hộ thường' not found");
    }

    const servicePackageId = servicePackageResult.rows[0].id;
    const createdDate = new Date();
    const updatedDate = createdDate;

    // Insert into Requests table
    const requestResult = await query(
      `INSERT INTO requests (servicepackageid, customerid, createddate, updateddate)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [servicePackageId, customerId, createdDate, updatedDate]
    );

    const requestId = requestResult.rows[0].id;

    // Insert into RequestDetails table
    await query(
      `INSERT INTO requestdetails (requestid, pickuplong, pickuplat, deslng, deslat, 
        pickuplocation, destination, totalprice, createddate, updateddate, requeststatus)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'Pending')`,
      [
        requestId,
        pickuplong,
        pickuplat,
        deslng,
        deslat,
        pickuplocation,
        destination,
        totalprice,
        createdDate,
        updatedDate,
      ]
    );

    return { message: "Rescue request created successfully!" };
  } catch (error) {
    console.error("Error creating rescue request:", error);
    throw error;
  }
};

module.exports = { createRescueRequest };
