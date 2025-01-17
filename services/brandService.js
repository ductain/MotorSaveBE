const query = require("../config/dbConfig");

const getBrands = async () => {
    const results = await query("SELECT * FROM brands");
    return results.rows;
};
const getBrandById = async (brandId) => {
    const results = await query(`SELECT * FROM brands WHERE id = $1`, [brandId]);
    return results.rows[0];
};

const createBrand = async (brandData) => {
    const { name } = brandData;
    await query(
        `INSERT INTO brands (name) 
           VALUES ($1)`,
        [name]
    );
    return { message: "New brand created!" };
};

const updateBrand = async (brandId, brandData) => {
    const { name } = brandData;

    const result = await query(
        `UPDATE brands SET name = $1
       WHERE id = $2 RETURNING *`,
        [name, brandId]
    );

    return result.rows[0];
};

const deleteBrand = async (brandId) => {
    const { rowCount } = await query(`DELETE FROM brands WHERE id = $1`, [brandId]);
    return rowCount > 0;
};

const isBrandNameTaken = async (name, excludeId = null) => {
    const queryText = excludeId
        ? `SELECT * FROM brands WHERE name = $1 AND id != $2`
        : `SELECT * FROM brands WHERE name = $1`;

    const values = excludeId ? [name, excludeId] : [name];
    const result = await query(queryText, values);

    return result.rows.length > 0;
};
module.exports = {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
    isBrandNameTaken
}