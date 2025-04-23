const query = require("../config/dbConfig");

const getRepairQuotes = async () => {
  const results = await query(
    `SELECT
      rq.id,
      rq.requestdetailid,
      rp.name AS repairpackagename,
      rcp.name AS repairname,
      pc.name AS partcategoryname,
      rq.detail,
      a.name AS accessoryname,
      rq.cost,
      rcp.rate AS wagerate,
      rq.wage,
      rq.total,
      rq.createddate,
      rq.updateddate
      FROM repairquote rq
      LEFT JOIN repaircostpreview rcp ON rcp.id = rq.repaircostpreviewid
      LEFT JOIN repairpackages rp ON rp.id  = rcp.repairpackageid
      LEFT JOIN partcategories pc ON pc.id = rcp.partcategoryid
      LEFT JOIN accessories a ON a.id = rq.accessoryid
    `);
  return results.rows;
};

const getRepairQuotesByRequestDetailId = async (requestDetailId) => {
  const results = await query(
    `SELECT
      rq.id,
      rq.requestdetailid,
      rp.name AS repairpackagename,
      rcp.name AS repairname,
      pc.name AS partcategoryname,
      rq.detail,
      a.name AS accessoryname,
      rq.cost,
      rcp.rate AS wagerate,
      rq.wage,
      rq.total,
      rq.createddate,
      rq.updateddate
      FROM repairquote rq
      LEFT JOIN repaircostpreview rcp ON rcp.id = rq.repaircostpreviewid
      LEFT JOIN repairpackages rp ON rp.id  = rcp.repairpackageid
      LEFT JOIN partcategories pc ON pc.id = rcp.partcategoryid
      LEFT JOIN accessories a ON a.id = rq.accessoryid
      WHERE rq.requestdetailid = $1`,
    [requestDetailId]);
  return results.rows;
};

const getRepairQuoteById = async (repQuoteId) => {
  const results = await query(
    `SELECT
      rq.id,
      rq.requestdetailid,
      rp.name AS repairpackagename,
      rcp.name AS repairname,
      pc.name AS partcategoryname,
      rq.detail,
      a.name AS accessoryname,
      rq.cost,
      rcp.rate AS wagerate,
      rq.wage,
      rq.total,
      rq.createddate,
      rq.updateddate
      FROM repairquote rq
      LEFT JOIN repaircostpreview rcp ON rcp.id = rq.repaircostpreviewid
      LEFT JOIN repairpackages rp ON rp.id  = rcp.repairpackageid
      LEFT JOIN partcategories pc ON pc.id = rcp.partcategoryid
      LEFT JOIN accessories a ON a.id = rq.accessoryid
      WHERE rq.id = $1`
    , [repQuoteId]);
  return results.rows[0];
};

const createRepairQuote = async (repQuoteData) => {
  const { detail, cost, requestdetailid, repaircostpreviewid, accessoryid, wage, total } = repQuoteData;
  const createdDate = new Date();
  const updatedDate = createdDate;
  await query(
    `INSERT INTO repairquote (detail, cost, requestdetailid, createddate, updateddate, repaircostpreviewid, accessoryid, wage, total) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [detail, cost, requestdetailid, createdDate, updatedDate, repaircostpreviewid, , accessoryid, wage, total]
  );
  return { message: "New repair quote created!" };
};

const updateRepairQuote = async (repQuoteId, repQuoteData) => {
  const { detail, cost } = repQuoteData;
  const updatedDate = new Date()
  const result = await query(
    `UPDATE repairquote SET detail = $1, cost = $2, updateddate = $3
       WHERE id = $4 RETURNING *`,
    [detail, cost, updatedDate, repQuoteId]
  );

  return result.rows[0];
};

const deleteRepairQuote = async (repQuoteId) => {
  const { rowCount } = await query(`DELETE FROM repairquote WHERE id = $1`, [repQuoteId]);
  return rowCount > 0;
};

const checkStaff = async (repQuoteId, staffId) => {
  const foundStaffId = await query(
    `SELECT rd.staffid 
    FROM repairquote rq
    LEFT JOIN requestdetails rd ON rq.requestdetailid = rd.id
    WHERE rq.id = $1`,
    [repQuoteId]
  );
  if (foundStaffId.rows.length === 0) {
    return false; // repQuoteId not found
  }

  return foundStaffId.rows[0].staffid === staffId;
};

module.exports = {
  getRepairQuotes,
  getRepairQuotesByRequestDetailId,
  getRepairQuoteById,
  createRepairQuote,
  updateRepairQuote,
  deleteRepairQuote,
  checkStaff
}