const query = require("../config/dbConfig");

const getAll = async () => {
    const results = await query(`SELECT * FROM staffinstation`);
    return results;
};

const getStaffsInAStation = async (stationId) => {
    const results = await query(
        `SELECT * FROM staffinstation 
        LEFT JOIN accounts ON (staffinstation.staffid = accounts.id)
        LEFT JOIN roles ON (accounts.roleid = roles.id) WHERE stationid = $1`, [stationId]);
    return results;
};

const checkIfStaffIsInAnyStation = async (staffId) => {
    const existedData = await query(
        `SELECT * FROM staffinstation 
        WHERE staffid = $1`,
        [staffId]
    );
    return existedData != null ? true : false;
}

const addStaffIntoStation = async (staffId, stationId) => {
    await query(
        `INSERT INTO staffinstation (staffid, stationid) 
           VALUES ($1, $2) RETURNING *`,
        [staffId, stationId]
    );
    return { message: "Staff has been addded into Station!" };
};

const updateStationOfAStaff = async (staffId, stationId) => {
    const result = await query(
        `UPDATE staffinstation SET stationid = $1
       WHERE staffid = $2 RETURNING *`,
        [stationId, staffId]
    );

    return result.rows[0];
};
module.exports = {
    getAll,
    getStaffsInAStation,
    checkIfStaffIsInAnyStation,
    addStaffIntoStation,
    updateStationOfAStaff
};
