const query = require("../config/dbConfig");

const getAccessories = async () => {
  const results = await query(`
    SELECT 
        a.id,
        p.name AS partcategoryname,
        b.name AS brandname,
        a.name AS accessoryname,
        a.cost
    FROM accessories a
    LEFT JOIN brands b on b.id = a.brandid
    LEFT JOIN partcategories p ON p.id = a.partcategoryid 
    ORDER BY b.id`);
  return results.rows;
};
const getAccessoryById = async (accessoryId) => {
  const results = await query(`
    SELECT 
        a.id,
        p.name AS partcategoryname,
        b.name AS brandname,
        a.name AS accessoryname,
        a.cost
    FROM accessories a
    LEFT JOIN brands b on b.id = a.brandid
    LEFT JOIN partcategories p ON p.id = a.partcategoryid 
    WHERE a.id = $1`
    , [accessoryId]);
  return results.rows[0];
};

const getAccessoriesByBrandId = async (brandId) => {
  const results = await query(`
    SELECT 
        a.id,
        p.name AS partcategoryname,
        b.name AS brandname,
        a.name AS accessoryname,
        a.cost
    FROM accessories a
    LEFT JOIN brands b on b.id = a.brandid
    LEFT JOIN partcategories p ON p.id = a.partcategoryid 
    WHERE a.brandid = $1`
    , [brandId]);
  return results.rows;
};

const getAccessoriesByParCatId = async (parCatId) => {
  const results = await query(`
    SELECT 
        a.id,
        p.name AS partcategoryname,
        b.name AS brandname,
        a.name AS accessoryname,
        a.cost
    FROM accessories a
    LEFT JOIN brands b on b.id = a.brandid
    LEFT JOIN partcategories p ON p.id = a.partcategoryid 
    WHERE a.partcategoryid = $1`
    , [parCatId]);
  return results.rows;
};

const getAcsrByParCatIdAndBrandId = async (parCatId, brandId) => {
  const results = await query(`
    SELECT 
        a.id,
        p.name AS partcategoryname,
        b.name AS brandname,
        a.name AS accessoryname,
        a.cost
    FROM accessories a
    LEFT JOIN brands b on b.id = a.brandid
    LEFT JOIN partcategories p ON p.id = a.partcategoryid 
    WHERE a.partcategoryid = $1
    AND a.brandid = $2
    `
    , [parCatId,brandId]);
  return results.rows;
};

const createAccessory = async (accessoryData) => {
  const { brandId, name, cost } = accessoryData;
  await query(
    `INSERT INTO accessories (brandid,name,cost) 
      VALUES ($1, $2, $3)`,
    [brandId, name, cost]
  );
  return { message: "New accessory created!" };
};

const updateAccessory = async (accessoryId, accessoryData) => {
  const { brandId, name, cost } = accessoryData;

  const result = await query(
    `UPDATE accessories SET brandid = $1, name = $2, cost = $3
       WHERE id = $4 RETURNING *`,
    [brandId, name, cost, accessoryId]
  );

  return result.rows[0];
};

const deleteAccessory = async (accessoryId) => {
  const { rowCount } = await query(`DELETE FROM accessories WHERE id = $1`, [accessoryId]);
  return rowCount > 0;
};

const isAccessoryNameTaken = async (name, excludeId = null) => {
  const queryText = excludeId
    ? `SELECT * FROM accessories WHERE name = $1 AND id != $2`
    : `SELECT * FROM accessories WHERE name = $1`;

  const values = excludeId ? [name, excludeId] : [name];
  const result = await query(queryText, values);

  return result.rows.length > 0;
};
module.exports = {
  getAccessories,
  getAccessoryById,
  getAccessoriesByBrandId,
  getAccessoriesByParCatId,
  getAcsrByParCatIdAndBrandId,
  createAccessory,
  updateAccessory,
  deleteAccessory,
  isAccessoryNameTaken
};