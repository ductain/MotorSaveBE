const staffInStationService = require("../services/staffInStationService");

const getAll = async (req, res) => {
  try {
    const staffs = await staffInStationService.getAll();
    res.status(200).json(staffs);
  } catch (err) {
    console.error("Error fetching all staffInStation:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getStaffsInAStation = async (req, res) => {
  try {
    const stationId = req.params.staffId;
    const staffs = await staffInStationService.getStaffsInAStation(stationId);
    res.status(200).json(staffs);
  } catch (err) {
    console.error("Error fetching staffs in a staion:", err);
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
  getAll,
  getStaffsInAStation,
  addStaffIntoStation,
  updateStationOfAStaff
};
