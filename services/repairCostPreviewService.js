const query = require("../config/dbConfig");

const getRepairCostPreviews = async () => {
  const results = await query(`
    SELECT 
        rcp.id,
        rcp.name,
        rcp.description,
        rp.name AS repairpackagename,
        pc.name AS partcategoryname,
        rcp.partcategoryid,
        rcp.min,
        rcp.max,
        rcp.wage,
        rcp.rate
    FROM repaircostpreview rcp
    LEFT JOIN repairpackages rp ON rp.id = rcp.repairpackageid
    LEFT JOIN partcategories pc ON pc.id = rcp.partcategoryid
    ORDER BY rcp.repairpackageid ASC`);
  return results.rows;
};

const getRepairCostPreviewById = async (repCosPreId) => {
  const results = await query(`
    SELECT 
        rcp.id,
        rcp.name,
        rcp.description,
        rp.name AS repairpackagename,
        pc.name AS partcategoryname,
        rcp.partcategoryid,
        rcp.min,
        rcp.max,
        rcp.wage,
        rcp.rate
    FROM repaircostpreview rcp
    LEFT JOIN repairpackages rp ON rp.id = rcp.repairpackageid
    LEFT JOIN partcategories pc ON pc.id = rcp.partcategoryid
    WHERE rcp.id = $1`, [repCosPreId]);
  return results.rows[0];
};

const createRepairCostPreview = async (managerid, repCosPreData) => {
  const { name, description, min, max, wage, repairpackageid, rate, partcategoryid } = repCosPreData;
  await query(
    `INSERT INTO repaircostpreview (name, description, min, max, managedby, wage, repairpackageid, rate, partcategoryid) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [name, description, min, max, managerid, wage, repairpackageid, rate, partcategoryid]
  );
  return { message: "New servicePackage created!" };
};

const updateRepairCostPreview = async (managerid, repCosPreId, repCosPreData) => {
  const { name, description, min, max, wage, rate, partcategoryid } = repCosPreData;

  const result = await query(
    `UPDATE repaircostpreview SET name = $1, description = $2, min = $3, max = $4, managedby = $5, wage = $6, rate = $7, partcategoryid = $8
       WHERE id = $9 RETURNING *`,
    [name, description, min, max, managerid, wage, rate, partcategoryid, repCosPreId]
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