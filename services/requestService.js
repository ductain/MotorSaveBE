const query = require("../config/dbConfig");
const { getStationOfAStaff } = require("./staffInStationService");

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

const createEmergencyRescueRequest = async (data, customerId) => {
  const {
    pickuplong,
    pickuplat,
    deslng,
    deslat,
    pickuplocation,
    destination,
    totalprice,
    stationid,
    vehicleid,
  } = data;

  try {
    const servicePackageResult = await query(
      `SELECT id FROM servicepackages WHERE name = 'Cứu hộ đến trạm'`
    );

    if (servicePackageResult.rows.length === 0) {
      throw new Error("Service package 'Cứu hộ thường' not found");
    }

    const servicePackageId = servicePackageResult.rows[0].id;
    const createdDate = new Date();
    const updatedDate = createdDate;

    // Insert into Requests table
    const requestResult = await query(
      `INSERT INTO requests (servicepackageid, customerid, stationid, vehicleid, createddate, updateddate)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [servicePackageId, customerId, stationid, vehicleid, createdDate, updatedDate]
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

const createFloodRescueRequest = async (data, customerId) => {
  const { pickuplong, pickuplat, pickuplocation, totalprice } = data;

  try {
    const servicePackageResult = await query(
      `SELECT id FROM servicepackages WHERE name = 'Cứu hộ nước ngập'`
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
      `INSERT INTO requestdetails (requestid, pickuplong, pickuplat, pickuplocation, totalprice, createddate, updateddate, requeststatus, requesttypeid)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Pending', 1) RETURNING id`,
      [
        requestId,
        pickuplong,
        pickuplat,
        pickuplocation,
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

const createRepairRequest = async (requestId) => {

  try {
    const createdDate = new Date();
    const updatedDate = createdDate;

    // Insert into RequestDetails table
    const requestDetailResult = await query(
      `INSERT INTO requestdetails (requestid, createddate, updateddate, requeststatus, requesttypeid)
       VALUES ($1, $2, $3, 'Pending', 2) RETURNING id`,
      [
        requestId,
        createdDate,
        updatedDate,
      ]
    );

    const requestDetailId = requestDetailResult.rows[0].id;

    return {
      message: "Repair request created successfully!",
      requestdetailid: requestDetailId,
    };
  } catch (error) {
    console.error("Error creating repair request:", error);
    throw error;
  }
};

const getPendingRepairRequestsByMechanic = async (staffId) => {
  try {
    const stationResult = await getStationOfAStaff(staffId);

    if (stationResult) {
      const stationId = stationResult.stationid;
      const result = await query(
        `SELECT 
        r.id AS requestid, 
        a.fullname AS customername, 
        a.phone AS customerphone, 
        rt.name AS requesttype,
        sp.name AS servicepackagename,
        rd.id AS requestdetailid,
        rd.requeststatus,
        r.createddate,
        rd.staffid,
        r.stationid
        FROM requests r
        JOIN servicepackages sp ON r.servicepackageid = sp.id
        JOIN accounts a ON r.customerid = a.id
        JOIN requestdetails rd ON r.id = rd.requestid
        JOIN stations s ON r.stationid = s.id
        JOIN requesttypes rt ON rd.requesttypeid = rt.id
        WHERE r.stationid = $1
        AND rd.requeststatus = 'Pending'
        AND rt.id = 2
        AND rd.staffid IS NULL
        ORDER BY r.createddate DESC;`,
        [stationId] // Use the retrieved stationid
      );

      return result.rows;
    } else {
      return []; // No station found, return empty array
    }
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

const getPendingReturnRequestsByDriver = async (staffId) => {
  try {
    const stationResult = await getStationOfAStaff(staffId);

    if (stationResult) {
      const stationId = stationResult.stationid;
      const result = await query(
        `SELECT 
        r.id AS requestid, 
        a.fullname AS customername, 
        a.phone AS customerphone, 
        rt.name AS requesttype,
        sp.name AS servicepackagename,
        rd.id AS requestdetailid,
        rd.requeststatus,
        r.createddate,
        rd.staffid,
        r.stationid
        FROM requests r
        JOIN servicepackages sp ON r.servicepackageid = sp.id
        JOIN accounts a ON r.customerid = a.id
        JOIN requestdetails rd ON r.id = rd.requestid
        JOIN stations s ON r.stationid = s.id
        JOIN requesttypes rt ON rd.requesttypeid = rt.id
        WHERE r.stationid = $1
        AND rd.requeststatus = 'Pending'
        AND rt.id = 4
        AND rd.staffid IS NULL
        ORDER BY r.createddate DESC;`,
        [stationId] // Use the retrieved stationid
      );

      return result.rows;
    } else {
      return []; // No station found, return empty array
    }
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

const acceptRepairRequest = async (requestDetailId, mechanicid) => {
  try {
    const updatedDate = new Date();
    const result = await query(
      `UPDATE requestdetails 
       SET requeststatus = 'Inspecting', staffid = $1, updateddate = $3
       WHERE id = $2
       RETURNING *`,
      [mechanicid, requestDetailId, updatedDate]
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

const acceptRepairQuote = async (requestDetailId) => {
  try {
    const updatedDate = new Date();
    const result = await query(
      `UPDATE requestdetails 
       SET requeststatus = 'Accepted', updateddate = $1
       WHERE id = $2
       RETURNING *`,
      [updatedDate, requestDetailId]
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

const getRepairRequestsByMechanic = async (staffId) => {
  try {
    const result = await query(
      `SELECT 
        r.id AS requestid, 
        a.fullname AS customername, 
        a.phone AS customerphone, 
        rt.name AS requesttype,
        sp.name AS servicepackagename,
        rd.id AS requestdetailid,
        rd.requeststatus,
        r.createddate,
        rd.staffid
      FROM requests r
      JOIN servicepackages sp ON r.servicepackageid = sp.id
      JOIN accounts a ON r.customerid = a.id
      JOIN requestdetails rd ON r.id = rd.requestid
      JOIN stations s ON r.stationid = s.id
      JOIN requesttypes rt ON rd.requesttypeid = rt.id
      WHERE rd.staffid = $1
      AND rd.requeststatus <> 'Cancel'
      AND rt.name = 'Sửa xe'
      ORDER BY r.createddate DESC`,
      [staffId]
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

const getRequestsByDriver = async (staffId) => {
  try {
    const result = await query(
      `SELECT 
        r.id AS requestid, 
        a.fullname AS customername, 
        a.phone AS customerphone, 
        rt.name AS requesttype,
        sp.name AS servicepackagename,
        rd.id AS requestdetailid,
        rd.pickuplocation, 
        rd.requeststatus,
        r.createddate,
        rd.staffid
      FROM requests r
      JOIN servicepackages sp ON r.servicepackageid = sp.id
      JOIN accounts a ON r.customerid = a.id
      JOIN requestdetails rd ON r.id = rd.requestid
      JOIN requesttypes rt ON rd.requesttypeid = rt.id
      WHERE rd.staffid = $1
      AND rd.requeststatus <> 'Cancel'
      AND r.createddate > CURRENT_DATE - INTERVAL '3 days'
      ORDER BY r.createddate DESC`,
      [staffId]
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

const getRequestsByCustomer = async (customerId) => {
  try {
    const result = await query(
      `SELECT 
        r.id AS requestid, 
        a.fullname AS drivername, 
        a.phone AS driverphone, 
        rt.name AS requesttype,
        rd.id AS requestdetailid,
        sp.name AS servicepackagename,
        rd.pickuplocation,
        rd.destination, 
        rd.requeststatus,
        r.createddate,
        rd.staffid
      FROM requests r
      JOIN servicepackages sp ON r.servicepackageid = sp.id
      JOIN requestdetails rd ON r.id = rd.requestid
      JOIN requesttypes rt ON rd.requesttypeid = rt.id
      LEFT JOIN accounts a ON rd.staffid = a.id
      WHERE r.customerid = $1
      AND rd.requeststatus <> 'Cancel'
      AND r.createddate > CURRENT_DATE - INTERVAL '7 days'
      ORDER BY r.createddate DESC`,
      [customerId]
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching customer requests:", error);
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
        sp.name AS servicepackagename,

        -- Driver Information
        d.fullname AS drivername,
        d.phone AS driverphone,
        v.licenseplate,
        br.name AS brandname,
        vt.name AS vehicletype,
        v.vehiclestatus

      FROM requestdetails rd
      JOIN requests r ON rd.requestid = r.id
      JOIN servicepackages sp ON r.servicepackageid = sp.id
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

const updateTotalPrice = async (requestDetailId, total) => {
  try {
    const updatedDate = new Date();
    const result = await query(
      `UPDATE requestdetails 
       SET totalprice = $1, updateddate = $2
       WHERE id = $3
       RETURNING *`,
      [total, updatedDate, requestDetailId]
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

const calculateTotalPrice = async (requestDetailId) => {
  try {
    const results = await query(`
      SELECT SUM(cost) AS total
      FROM repairquote
      WHERE requestdetailid = $1;
    `, [requestDetailId]);
    return results.rows[0].total || 0; // Return 0 if no rows are found
  } catch (error) {
    console.error('Error calculating total price:', error);
    throw error;
  }
};


const cancelRequestWithReason = async (requestdetailid, note) => {
  // Check if request exists
  const existingRequest = await query(
    "SELECT * FROM requestdetails WHERE id = $1",
    [requestdetailid]
  );

  if (existingRequest.rowCount === 0) {
    throw new Error("Not Found");
  }

  // Update request status to "Cancel" with note
  await query(
    `UPDATE requestdetails 
     SET requeststatus = 'Cancel', note = $2, updateddate = NOW()
     WHERE id = $1`,
    [requestdetailid, note]
  );

  return { message: "Request successfully canceled" };
};

const getRepairRequestDetail = async (requestId) => {
  try {
    const result = await query(
      `SELECT 
        r.id AS requestid,
        rt.name AS requesttype,
        rd.id AS requestdetailid,
        rd.requeststatus,
        rd.totalprice,
        rd.createddate,
        s.id AS stationid,
        s.name AS stationname,
        s.address AS stationaddress,
        s.long,
        s.lat,
        m.id AS mechanicid,
        m.fullname AS mechanicname,
        m.phone AS mechanicphone,
        m.avatar AS mechanicavatar,
        cv.id AS vehicleid,
        cv.licenseplate,
        cv.photo AS vehiclephoto,
        cv.condition AS vehiclecondition
      FROM requests r
      JOIN requestdetails rd ON r.id = rd.requestid
      JOIN requesttypes rt ON rd.requesttypeid = rt.id
      LEFT JOIN stations s ON r.stationid = s.id
      LEFT JOIN accounts m ON rd.staffid = m.id
      LEFT JOIN cvehicles cv ON r.vehicleid = cv.id
      WHERE r.id = $1
      AND rd.requesttypeid = 2`,
      [requestId]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching repair request details:", error);
    throw error;
  }
};

const getRepairRequestDetailForMechanic = async (requestId) => {
  try {
    const result = await query(
      `SELECT 
        r.id AS requestid,
        rt.name AS requesttype,
        rd.id AS requestdetailid,
        rd.requeststatus,
        rd.totalprice,
        s.id AS stationid,
        s.name AS stationname,
        s.address AS stationaddress,
        c.id AS customerid,
        c.fullname AS customername,
        c.phone AS customerphone,
        c.avatar AS customeravatar,
        cv.id AS vehicleid,
        cv.licenseplate,
        cv.photo AS vehiclephoto,
        cv.condition AS vehiclecondition
      FROM requests r
      JOIN requestdetails rd ON r.id = rd.requestid
      JOIN requesttypes rt ON rd.requesttypeid = rt.id
      LEFT JOIN stations s ON r.stationid = s.id
      LEFT JOIN accounts c ON r.customerid = c.id
      LEFT JOIN cvehicles cv ON r.vehicleid = cv.id
      WHERE r.id = $1
      AND rd.requesttypeid = 2`,
      [requestId]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching repair request details:", error);
    throw error;
  }
};

const createReturnRequest = async (data, requestId) => {
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
    const requestResult = await query(
      `SELECT * FROM requests WHERE id = $1`, [requestId]
    );

    if (requestResult.rows.length === 0) {
      throw new Error("Request id not found");
    }

    const createdDate = new Date();
    const updatedDate = createdDate;
    // Insert into RequestDetails table
    const requestDetailResult = await query(
      `INSERT INTO requestdetails (requestid, pickuplong, pickuplat, deslng, deslat, 
        pickuplocation, destination, totalprice, createddate, updateddate, requeststatus, requesttypeid)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'Locked', 4) RETURNING id`,
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
      message: "Return request created successfully!",
      requestdetailid: requestDetailId,
      totalprice: totalprice,
    };
  } catch (error) {
    console.error("Error creating rescue request:", error);
    throw error;
  }
};

const getReturnRequestIdBasedOnCurrentRepairRequest = async (requestDetailId) => {
  try {
    const result = await query(
      `SELECT rd.id FROM requestdetails rd
        LEFT JOIN requesttypes rt ON rd.requesttypeid = rt.id
        WHERE rd.requestid = (
        SELECT requestid FROM requestdetails rd WHERE rd.id = $1)
        AND rt.id = 4`,
      [requestDetailId]
    );

    if (result.rowCount === 0) {
      return null; // No request found
    }

    return result.rows[0].id; // Return only the id of the first row
  } catch (error) {
    console.error("Error fetching request details:", error);
    throw error;
  }
};

const getLatestRequestDetail = async (requestId) => {
  try {
    const result = await query(
      `SELECT 
        rd.id AS requestdetailid,
        rd.requeststatus,
        rd.createddate,
        rd.updateddate,
        rd.requestid,
        sp.name AS servicepackagename,
        rt.name AS requesttype
      FROM requestdetails rd
      JOIN requests r ON rd.requestid = r.id
      JOIN servicepackages sp ON r.servicepackageid = sp.id
      JOIN requesttypes rt ON rd.requesttypeid = rt.id
      WHERE rd.requestid = $1
      ORDER BY rd.createddate DESC
      LIMIT 1`,
      [requestId]
    );

    if (result.rowCount === 0) {
      return null; // No request detail found
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching latest request detail:", error);
    throw error;
  }
};

module.exports = {
  createRescueRequest: createRescueRequest,
  createFloodRescueRequest: createFloodRescueRequest,
  createEmergencyRescueRequest: createEmergencyRescueRequest,
  createRepairRequest: createRepairRequest,
  getPendingRepairRequestsByMechanic,
  getPendingReturnRequestsByDriver,
  acceptRepairRequest,
  acceptRepairQuote: acceptRepairQuote,
  getRepairRequestsByMechanic,
  getRequestsByDriver: getRequestsByDriver,
  getRequestsByCustomer: getRequestsByCustomer,
  acceptRequest: acceptRequest,
  getRequestDetailByDriver: getRequestDetailByDriver,
  updateRequestStatus: updateRequestStatus,
  cancelRequestWithReason: cancelRequestWithReason,
  getRepairRequestDetail: getRepairRequestDetail,
  getRepairRequestDetailForMechanic,
  calculateTotalPrice,
  updateTotalPrice,
  createReturnRequest: createReturnRequest,
  getReturnRequestIdBasedOnCurrentRepairRequest,
  getLatestRequestDetail: getLatestRequestDetail,
};
