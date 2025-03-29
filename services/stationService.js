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
  const { name, address, long, lat } = stationData;
  const createdDate = new Date();
  const updatedDate = createdDate;
  await query(
    `INSERT INTO stations (name, address, long, lat, createddate, updateddate) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
    [name, address, long, lat, createdDate, updatedDate]
  );
  return { message: "Create station successfully!" };
};

const updateStation = async (stationId, stationData) => {
  const { name, address, long, lat } = stationData;
  const updatedDate = new Date();
  const result = await query(
    `UPDATE stations SET name = $1, address = $2, long = $3, lat = $4, updatedDate = $5
     WHERE id = $6 RETURNING *`,
    [name, address, long, lat, updatedDate, stationId]
  );

  return result.rows[0];
};

const isStationNameTaken = async (name, excludeId = null) => {
  const queryText = excludeId
      ? `SELECT * FROM stations WHERE name = $1 AND id != $2`
      : `SELECT * FROM stations WHERE name = $1`;

  const values = excludeId ? [name, excludeId] : [name];
  const result = await query(queryText, values);

  return result.rows.length > 0;
};

const deleteStation = async (stationId) => {
  const { rowCount } = await query(`DELETE FROM stations WHERE id = $1`, [stationId]);
  return rowCount > 0;
};

module.exports = {
  getStations,
  getStationById,
  createStation,
  updateStation,
  isStationNameTaken,
  deleteStation
};
