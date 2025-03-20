const query = require("../config/dbConfig");

const getRepairCostPreviews = async () => {
    const results = await query("SELECT * FROM repaircostpreview");
    return results.rows;
};

const getRepairCostPreviewById = async (repCosPreId) => {
    const results = await query(`SELECT * FROM repaircostpreview WHERE id = $1`, [repCosPreId]);
    return results.rows[0];
};

const createRepairCostPreview = async (adminid, repCosPreData) => {
    const { name, description, min, max } = repCosPreData;
    await query(
        `INSERT INTO repaircostpreview (name, description, min, max, managedby) 
           VALUES ($1, $2, $3, $4, $5)`,
        [name, description, min, max, adminid]
    );
    return { message: "New servicePackage created!" };
};

const updateRepairCostPreview = async (adminid, repCosPreId, repCosPreData) => {
    const { name, description, min, max } = repCosPreData;

    const result = await query(
        `UPDATE repaircostpreview SET name = $1, description = $2, min = $3, max = $4, managedby = $5
       WHERE id = $6 RETURNING *`,
        [name, description, min, max, adminid, repCosPreId]
    );

    return result.rows[0];
};

const deleteRepairCostPreview = async (repCosPreId) => {
    const { rowCount } = await query(`DELETE FROM repaircostpreview WHERE id = $1`, [repCosPreId]);
    return rowCount > 0;
};

const isRepCosPreNameTaken = async (name, excludeId = null) => {
    const queryText = excludeId
        ? `SELECT * FROM repaircostpreview WHERE name = $1 AND id != $2`
        : `SELECT * FROM repaircostpreview WHERE name = $1`;

    const values = excludeId ? [name, excludeId] : [name];
    const result = await query(queryText, values);

    return result.rows.length > 0;
};

module.exports = {
    getRepairCostPreviews,
    getRepairCostPreviewById,
    createRepairCostPreview,
    updateRepairCostPreview,
    deleteRepairCostPreview,
    isRepCosPreNameTaken
}