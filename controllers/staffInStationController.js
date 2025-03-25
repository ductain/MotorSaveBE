const staffInStationService = require("../services/staffInStationService");

const getAllStaffsInStations = async (req, res) => {
  try {
    const staffs = await staffInStationService.getAllStaffsInStations();
    res.status(200).json(staffs);
  } catch (err) {
    console.error("Error fetching all staffInStation:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getStaffsNotInAnyStation = async (req, res) => {
  try {
    const staffs = await staffInStationService.getStaffsNotInAnyStation();
    res.status(200).json(staffs);
  } catch (err) {
    console.error("Error fetching all staffInStation:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getStaffsInAStation = async (req, res) => {
  try {
    const stationId = req.params.stationId;
    const staffs = await staffInStationService.getStaffsInAStation(stationId);
    res.status(200).json(staffs);
  } catch (err) {
    console.error("Error fetching staffs in a staion:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//The below used for Staff to view their own station
const getStationOfAStaff = async (req, res) => {
  try {
    const staffId = req.user.id;
    const station = await staffInStationService.getStationOfAStaff(staffId);
    res.status(200).json(station);
  } catch (err) {
    console.error("Error fetching station of this staff:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//The below used for Admin
const getStationByStaffId = async (req, res) => {
  try {
    const staffId = req.params.staffId;
    const station = await staffInStationService.getStationOfAStaff(staffId);
    if (!station) res.status(404).json({ message: "Staff is currently not in this station" });
    res.status(200).json(station);
  } catch (err) {
    console.error("Error fetching station of this staff:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addStaffIntoStation = async (req, res) => {
  try {
    const { staffId, stationId } = req.body;
    const staffExisted = await staffInStationService.checkIfStaffIsInAnyStation(staffId);
    if (staffExisted) {
      return res.status(401).json({ message: "Staff already in another station, cannot add this one" });
    }
    const result = await staffInStationService.addStaffIntoStation(staffId, stationId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error adding staff into a staion:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const updateStationOfAStaff = async (req, res) => {
  try {
    const staffId = req.params.staffId
    const stationId = req.body;
    const updatedStaff = await staffInStationService.updateStationOfAStaff(staffId, stationId);
    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json({ updatedStaff, message: "Staff updated sucessfully!" });
  } catch (err) {
    console.error("Error updating sstaff:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllStaffsInStations,
  getStaffsNotInAnyStation,
  getStaffsInAStation,
  getStationOfAStaff,
  getStationByStaffId,
  addStaffIntoStation,
  updateStationOfAStaff
};
