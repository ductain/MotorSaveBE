const query = require("../config/dbConfig");

const getAll = async () => {
    const results = await query(`SELECT * FROM staffinstation`);
    return results.rows;
};

const getStaffsInAStation = async (stationId) => {
    const results = await query(
        `SELECT
        a.id AS staffid,
        sis.stationId AS stationid,
        a.username,
        a.email,
        a.fullname,
        a.gender,
        a.phone,
        r.name AS rolename
        FROM staffinstation sis
        LEFT JOIN accounts a ON (sis.staffid = a.id)
        LEFT JOIN roles r ON (a.roleid = r.id) WHERE sis.stationid = $1`, [stationId]);
    return results.rows;
};

const getStationOfAStaff = async (staffId) => {
    const results = await query(
        `SELECT
        s.id AS stationid,
        s.name AS stationname,
        s.address AS stationaddress,
        s.long AS stationlong,
        s.lat AS stationlat
        FROM staffinstation sis
        LEFT JOIN stations s ON (sis.stationid = s.id)
        WHERE sis.staffid = $1`, [staffId]);
    return results.rows[0];
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
    getStationOfAStaff,
    checkIfStaffIsInAnyStation,
    addStaffIntoStation,
    updateStationOfAStaff
};
