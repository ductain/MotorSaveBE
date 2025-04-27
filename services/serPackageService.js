const query = require("../config/dbConfig");

const getSerPackgages = async () => {
    const results = await query("SELECT * FROM servicepackages");
    return results.rows;
};
const getSerPacById = async (serPacId) => {
    const results = await query(`SELECT * FROM servicepackages WHERE id = $1`, [serPacId]);
    return results.rows[0];
};

const getSerPacByName = async (serPacName) => {
    const results = await query(`SELECT * FROM servicepackages WHERE name LIKE $1`, [serPacName]);
    return results.rows[0];
};

const createSerPackage = async (serPacData) => {
    const { name, description, rate } = serPacData;
    const createdDate = new Date();
    const updatedDate = createdDate;
    await query(
        `INSERT INTO servicepackages (name, description, rate, createddate, updateddate) 
           VALUES ($1, $2, $3, $4, $5)`,
        [name, description, rate, createdDate, updatedDate]
    );
    return { message: "New servicePackage created!" };
};

const updateSerPackage = async (serPacId, serPacData) => {
    const { name, description, rate } = serPacData;
    const updatedDate = new Date();
    const result = await query(
        `UPDATE servicepackages SET name = $1, description = $2, rate = $3, updateddate = $4
       WHERE id = $5 RETURNING *`,
        [name, description, rate, updatedDate, serPacId]
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
    getSerPacByName,
    createSerPackage,
    updateSerPackage,
    deleteSerPackage,
    isSerPacNameTaken
}