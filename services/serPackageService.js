const query = require("../config/dbConfig");

const getSerPackgages = async () => {
    const results = await query("SELECT * FROM servicepackages");
    return results.rows;
};
const getSerPacById = async (serPacId) => {
    const results = await query(`SELECT * FROM servicepackages WHERE id = $1`, [serPacId]);
    return results.rows[0];
};

const createSerPackage = async (serPacData) => {
    const { name, description, rate, createdDate, updatedDate } = serPacData;
    await query(
        `INSERT INTO servicepackages (name, description, rate, createdDate, updatedDate) 
           VALUES ($1, $2, $3, $4, $5)`,
        [name, description, rate, createdDate, updatedDate]
    );
    return { message: "New servicePackage created!" };
};

const updateSerPackage = async (serPacId, serPacData) => {
    const { name, description, rate, createdDate, updatedDate } = serPacData;

    const result = await query(
        `UPDATE servicepackages SET name = $1, description = $2, rate = $3, createdDate = $4, updatedDate = $5
       WHERE id = $6 RETURNING *`,
        [name, description, rate, createdDate, updatedDate, serPacId]
    );

    return result.rows[0];
};

const deleteSerPackage = async (serPacId) => {
    const { rowCount } = await query(`DELETE FROM servicepackages WHERE id = $1`, [serPacId]);
    return rowCount > 0;
};

const isSerPacNameTaken = async (name, excludeId = null) => {
    const queryText = excludeId
        ? `SELECT * FROM servicepackages WHERE name = $1 AND id != $2`
        : `SELECT * FROM servicepackages WHERE name = $1`;

    const values = excludeId ? [name, excludeId] : [name];
    const result = await query(queryText, values);

    return result.rows.length > 0;
};

module.exports = {
    getSerPackgages,
    getSerPacById,
    createSerPackage,
    updateSerPackage,
    deleteSerPackage,
    isSerPacNameTaken
}