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

const upsertCustomerVehicle = async ({ customerId, licensePlate, brandId }) => {
  const results = await query(
    `INSERT INTO cvehicles (licenseplate, customerid, brandid)
     VALUES ($1, $2, $3)
     ON CONFLICT (licenseplate) 
     DO UPDATE SET 
       customerid = EXCLUDED.customerid,
       brandid = EXCLUDED.brandid
     RETURNING *`,
    [licensePlate, customerId, brandId]
  );
  return results.rows[0];
}

module.exports = {
  getCustomerVehicles,
  getCustomerVehiclesById,
  getVehiclesByCustomerId,
  upsertCustomerVehicle
};