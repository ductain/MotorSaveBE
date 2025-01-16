const query = require("../config/dbConfig");

const getCustomerVehicles = async () => {
  const results = await query("SELECT * FROM cvehicles");
  return results.rows;
};

const getCustomerVehiclesById = async (vehicleId) => {
  const results = await query(`SELECT * FROM cvehicles WHERE id = $1`, [
    vehicleId,
  ]);
  return results.rows[0];
};

module.exports = {
  getCustomerVehicles: getCustomerVehicles,
  getCustomerVehiclesById: getCustomerVehiclesById,
};
