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
    const requestDetailResult = await query(
      `INSERT INTO requestdetails (requestid, pickuplong, pickuplat, deslng, deslat, 
        pickuplocation, destination, totalprice, createddate, updateddate, requeststatus, requesttypeid)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'Pending', 1) RETURNING id`,
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

    const requestDetailId = requestDetailResult.rows[0].id;

    return {
      message: "Rescue request created successfully!",
      requestdetailid: requestDetailId,
      totalprice: totalprice,
    };
  } catch (error) {
    console.error("Error creating rescue request:", error);
    throw error;
  }
};

const getRequests = async () => {
  try {
    const result = await query(
      `SELECT 
        r.id AS requestid, 
        a.fullname, 
        a.phone, 
        rt.name AS requesttype,
        rd.id AS requestdetailid,
        rd.pickuplocation, 
        rd.requeststatus,
        r.createddate
      FROM requests r
      JOIN accounts a ON r.customerid = a.id
      JOIN requestdetails rd ON r.id = rd.requestid
      JOIN requesttypes rt ON rd.requesttypeid = rt.id
      WHERE rd.requeststatus <> 'Cancel'
      ORDER BY r.createddate DESC`
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching pending rescue requests:", error);
    throw error;
  }
};

const acceptRequest = async (requestDetailId, driverId) => {
  try {
    const updatedDate = new Date();
    const result = await query(
      `UPDATE requestdetails 
       SET requeststatus = 'Accepted', staffid = $1, updateddate = $3
       WHERE id = $2
       RETURNING *`,
      [driverId, requestDetailId, updatedDate]
    );

    if (result.rowCount === 0) {
      return null; // No request found
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error accepting request:", error);
    throw error;
  }
};

const getRequestDetailByDriver = async (requestDetailId) => {
  try {
    const result = await query(
      `SELECT 
        -- Customer Information
        c.fullname AS customername, 
        c.phone AS customerphone, 
        rt.name AS requesttype,
        
        -- Request Details
        rd.id AS requestdetailid,
        rd.pickuplong,
        rd.pickuplat,
        rd.deslng,
        rd.deslat,
        rd.note,
        rd.pickuplocation,
        rd.destination,
        rd.totalprice,
        r.createddate,
        rd.requeststatus,
        rd.requestid,
        rd.staffid,
        rd.estimatedtime,

        -- Driver Information
        d.fullname AS drivername,
        d.phone AS driverphone,
        v.licenseplate,
        br.name AS brandname,
        vt.name AS vehicletype,
        v.vehiclestatus

      FROM requestdetails rd
      JOIN requests r ON rd.requestid = r.id
      JOIN accounts c ON r.customerid = c.id
      JOIN requesttypes rt ON rd.requesttypeid = rt.id
      LEFT JOIN accounts d ON rd.staffid = d.id -- Get driver details
      LEFT JOIN dvehicles v ON d.id = v.driverid -- Get vehicle details
      LEFT JOIN brands br ON v.brandid = br.id
      LEFT JOIN vehicletypes vt ON v.vehicletypeid = vt.id

      WHERE rd.id = $1`,
      [requestDetailId]
    );

    if (result.rowCount === 0) {
      return null; // No request found
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching request details:", error);
    throw error;
  }
};

const updateRequestStatus = async (requestDetailId, newStatus) => {
  try {
    const updatedDate = new Date();
    const result = await query(
      `UPDATE requestdetails 
       SET requeststatus = $1, updateddate = $2
       WHERE id = $3
       RETURNING *`,
      [newStatus, updatedDate, requestDetailId]
    );

    if (result.rowCount === 0) {
      return null; // Request not found
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error updating request status:", error);
    throw error;
  }
};

module.exports = {
  createRescueRequest: createRescueRequest,
  getRequests: getRequests,
  acceptRequest: acceptRequest,
  getRequestDetailByDriver: getRequestDetailByDriver,
  updateRequestStatus: updateRequestStatus,
};
