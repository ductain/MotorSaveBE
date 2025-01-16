const query = require("../config/dbConfig");

const getDriverVehicles = async () => {
  const results = await query("SELECT * FROM dvehicles");
  return results.rows;
};

const getDriverVehiclesById = async (vehicleId) => {
  const results = await query(`SELECT * FROM dvehicles WHERE id = $1`, [
    vehicleId,
  ]);
  return results.rows[0];
};

module.exports = {
  getDriverVehicles: getDriverVehicles,
  getDriverVehiclesById: getDriverVehiclesById,
};
