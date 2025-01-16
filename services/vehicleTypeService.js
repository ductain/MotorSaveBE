const query = require("../config/dbConfig");

const getVehicleTypes = async () => {
    const results = await query("SELECT * FROM vehicletypes");
    return results.rows;
};
const getVehicleTypeById = async (vehicleTypeId) => {
    const results = await query(`SELECT * FROM vehicletypes WHERE id = $1`, [vehicleTypeId]);
    return results.rows[0];
};

const createVehicleType = async (vehicleTypeData) => {
    const { name, rate } = vehicleTypeData;
    await query(
        `INSERT INTO vehicletypes (name, rate) 
           VALUES ($1, $2)`,
        [name, rate]
    );
    return { message: "New vehicleType created!" };
};

const updateVehicleType = async (vehicleTypeId, vehicleTypeData) => {
    const { name, rate } = vehicleTypeData;

    const result = await query(
        `UPDATE vehicletypes SET name = $1, rate = $2
       WHERE id = $3 RETURNING *`,
        [name, rate,vehicleTypeId]
    );

    return result.rows[0];
};

const deleteVehicleType = async (vehicleTypeId) => {
    const { rowCount } = await query(`DELETE FROM vehicletypes WHERE id = $1`, [vehicleTypeId]);
    return rowCount > 0;
  };

module.exports = {
    getVehicleTypes,
    getVehicleTypeById,
    createVehicleType,
    updateVehicleType,
    deleteVehicleType
}