const query = require("../config/dbConfig");

const getRequestTypes = async () => {
    const results = await query("SELECT * FROM requesttypes");
    return results.rows;
};
const getRequestTypeById = async (reqTypeId) => {
    const results = await query(`SELECT * FROM requesttypes WHERE id = $1`, [reqTypeId]);
    return results.rows[0];
};

const createRequestType = async (reqTypeData) => {
    const { name } = reqTypeData;
    await query(
        `INSERT INTO requesttypes (name) 
           VALUES ($1)`,
        [name]
    );
    return { message: "New requestType created!" };
};

const updateRequestType = async (reqTypeId, reqTypeData) => {
    const { name } = reqTypeData;

    const result = await query(
        `UPDATE requesttypes SET name = $1
       WHERE id = $2 RETURNING *`,
        [name, reqTypeId]
    );

    return result.rows[0];
};

const deleteRequestType = async (reqTypeId) => {
    const { rowCount } = await query(`DELETE FROM requesttypes WHERE id = $1`, [reqTypeId]);
    return rowCount > 0;
};

const isRequestTypeTaken = async (name, excludeId = null) => {
    const queryText = excludeId
        ? `SELECT * FROM requesttypes WHERE name = $1 AND id != $2`
        : `SELECT * FROM requesttypes WHERE name = $1`;

    const values = excludeId ? [name, excludeId] : [name];
    const result = await query(queryText, values);

    return result.rows.length > 0;
};

module.exports = {
    getRequestTypes,
    getRequestTypeById,
    createRequestType,
    updateRequestType,
    deleteRequestType,
    isRequestTypeTaken
}