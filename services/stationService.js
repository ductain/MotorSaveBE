const query = require("../config/dbConfig");

const getStations = async () => {
  const results = await query("SELECT * FROM stations");
  return results.rows;
};

const getStationById = async (stationId) => {
  const results = await query(`SELECT * FROM stations WHERE id = $1`, [stationId]);
  return results.rows[0];
};

const createStation = async (stationData) => {
  const { name, address, longtitude, latitude, createdDate, updatedDate } = stationData;
  await query(
    `INSERT INTO stations (name, address, longtitude, latitude, createdDate, updatedDate) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
    [name, address, longtitude, latitude, createdDate, updatedDate]
  );
  return { message: "Create successfully!" };
};

const updateStation = async (stationId, stationData) => {
  const { name, address, longtitude, latitude, createdDate, updatedDate } = stationData;

  const result = await query(
    `UPDATE stations SET name = $1, address = $2, longtitude = $3, latitude = $4, createdDate = $5, updatedDate = $6
     WHERE id = $7 RETURNING *`,
    [name, address, longtitude, latitude, createdDate, updatedDate, stationId]
  );

  return result.rows[0];
};


const deleteStation = async (stationId) => {
  const { rowCount } = await query(`DELETE FROM stations WHERE id = $1`, [stationId]);
  return rowCount > 0;
};

module.exports = {
  getStations: getStations,
  getStationById: getStationById,
  createStation: createStation,
  updateStation: updateStation,
  deleteStation: deleteStation
};
