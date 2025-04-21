const query = require("../config/dbConfig");

const getPartCategories = async () => {
    const results = await query("SELECT * FROM partcategories");
    return results.rows;
};
const getParCatById = async (parCatId) => {
    const results = await query(`SELECT * FROM partcategories WHERE id = $1`, [parCatId]);
    return results.rows[0];
};

const createParCat = async (parCatData) => {
    const { name } = parCatData;
    await query(
        `INSERT INTO partcategories (name) 
           VALUES ($1)`,
        [name]
    );
    return { message: "New part category created!" };
};

const updateParCat = async (parCatId, parCatData) => {
    const { name } = parCatData;

    const result = await query(
        `UPDATE partcategories SET name = $1
       WHERE id = $2 RETURNING *`,
        [name, parCatId]
    );

    return result.rows[0];
};

const deleteParCat = async (parCatId) => {
    const { rowCount } = await query(`DELETE FROM partcategories WHERE id = $1`, [parCatId]);
    return rowCount > 0;
};

const isParCatNameTaken = async (name, excludeId = null) => {
    const queryText = excludeId
        ? `SELECT * FROM partcategories WHERE name = $1 AND id != $2`
        : `SELECT * FROM partcategories WHERE name = $1`;

    const values = excludeId ? [name, excludeId] : [name];
    const result = await query(queryText, values);

    return result.rows.length > 0;
};
module.exports = {
    getPartCategories,
    getParCatById,
    createParCat,
    updateParCat,
    deleteParCat,
    isParCatNameTaken
}