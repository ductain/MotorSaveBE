const query = require("../config/dbConfig");

const getModels = async () => {
  const results = await query(`
    SELECT
     vm.id,
     b.name AS brandname,
     vm.name AS modelname,
     vm.rate AS modelrate
    FROM vehiclemodels vm
    LEFT JOIN brands b ON b.id = vm.brandid
        `);
  return results.rows;
};
const getModelById = async (modelId) => {
  const results = await query(`
    SELECT
      vm.id,
      b.name AS brandname,
      vm.name AS modelname,
      vm.rate AS modelrate
    FROM vehiclemodels vm
    LEFT JOIN brands b ON b.id = vm.brandid
    WHERE id = $1
    `, [modelId]);
  return results.rows[0];
};

const createModel = async (modelData) => {
  const { brandId, name, rate } = modelData;
  await query(
    `INSERT INTO vehiclemodels (brandid, name, rate) 
           VALUES ($1, $2, $3)`,
    [brandId, name, rate]
  );
  return { message: "New model created!" };
};

const updateModel = async (modelId, modelData) => {
  const { brandId, name, rate } = modelData;

  const result = await query(
    `UPDATE vehiclemodels SET brandid = $1, name = $2, rate = $3
       WHERE id = $4 RETURNING *`,
    [brandId, name, rate, modelId]
  );

  return result.rows[0];
};

const deleteModel = async (modelId) => {
  const { rowCount } = await query(`DELETE FROM vehiclemodels WHERE id = $1`, [modelId]);
  return rowCount > 0;
};

const isModelNameTaken = async (name, excludeId = null) => {
  const queryText = excludeId
    ? `SELECT * FROM vehiclemodels WHERE name = $1 AND id != $2`
    : `SELECT * FROM vehiclemodels WHERE name = $1`;

  const values = excludeId ? [name, excludeId] : [name];
  const result = await query(queryText, values);

  return result.rows.length > 0;
};
module.exports = {
  getModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel,
  isModelNameTaken,
}