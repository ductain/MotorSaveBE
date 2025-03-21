const query = require("../config/dbConfig");

const getCustomerVehicles = async () => {
  const results = await query(
    `SELECT
      cv.id AS vehicleid,
      b.name AS brandname,
      cv.licenseplate AS licenseplate,
      cv.customerid AS customerid,
      a.fullname AS customername,
      cv.stationid AS stationid,
      s.name AS stationname,
      s.address AS stationaddress
      FROM cvehicles cv
      LEFT JOIN brands b ON cv.brandid = b.id
      LEFT JOIN accounts a ON cv.customerid = a.id
      LEFT JOIN stations s ON cv.stationid = s.id`
  );
  return results.rows;
};

const getCustomerVehiclesById = async (vehicleId) => {
  const results = await query(
    `SELECT
      cv.id AS vehicleid,
      b.name AS brandname,
      cv.licenseplate AS licenseplate,
      cv.customerid AS customerid,
      a.fullname AS customername,
      cv.stationid AS stationid,
      s.name AS stationname,
      s.address AS stationaddress
      FROM cvehicles cv
      LEFT JOIN brands b ON cv.brandid = b.id
      LEFT JOIN accounts a ON cv.customerid = a.id
      LEFT JOIN stations s ON cv.stationid = s.id
      WHERE cv.id = $1`
    , [vehicleId]
  );
  return results.rows[0];
};

const getVehiclesByCustomerId = async (customerId) => {
  const results = await query(
    `SELECT
      cv.id AS vehicleid,
      b.name AS brandname,
      cv.licenseplate AS licenseplate,
      cv.customerid AS customerid,
      a.fullname AS customername,
      cv.stationid AS stationid,
      s.name AS stationname,
      s.address AS stationaddress
      FROM cvehicles cv
      LEFT JOIN brands b ON cv.brandid = b.id
      LEFT JOIN accounts a ON cv.customerid = a.id
      LEFT JOIN stations s ON cv.stationid = s.id
      WHERE cv.customerid = $1`
    , [customerId]
  );
  return results.rows;
};

const checkVehicleExists = async (licensePlate) => {
  const exists = await query(
    `SELECT * FROM cvehicles WHERE licenseplate = $1`,
    [licensePlate]
  );
  return exists.rows.length > 0;
};

const upsertCustomerVehicle = async ({ customerId, licensePlate, brandId }) => {
  const exists = await checkVehicleExists(licensePlate);

  let result = {}
  if (exists) {
    result = await query(
      `UPDATE cvehicles 
       SET customerid = $1, brandid = $2
       WHERE licenseplate = $3
       RETURNING *`,
      [customerId, brandId, licensePlate]
    );
  } else {
    result = await query(
      `INSERT INTO cvehicles (licenseplate, customerid, brandid)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [licensePlate, customerId, brandId]
    );
  }
  return result.rows[0];
};

module.exports = {
  getCustomerVehicles,
  getCustomerVehiclesById,
  getVehiclesByCustomerId,
  upsertCustomerVehicle
};