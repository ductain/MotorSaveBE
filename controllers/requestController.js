const requestService = require("../services/requestService");

const createRescueRequest = async (req, res) => {
  try {
    const customerId = req.user.id; // Assuming user ID comes from JWT
    const result = await requestService.createRescueRequest(
      req.body,
      customerId
    );
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await requestService.getRequests();
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { requestDetailId } = req.params;
    const driverId = req.user.id; // Get driver ID from authenticated token

    const updatedRequest = await requestService.acceptRequest(
      requestDetailId,
      driverId
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .json({ message: "Request not found or already accepted" });
    }

    res.status(200).json({
      message: "Request accepted successfully!",
      requestDetail: updatedRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getRequestDetailByDriver = async (req, res) => {
  try {
    const { requestDetailId } = req.params;

    const requestDetail = await requestService.getRequestDetailByDriver(
      requestDetailId
    );

    if (!requestDetail) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(requestDetail);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { requestDetailId } = req.params;
    const { newStatus } = req.body;
    const validStatuses = ["Pickup", "Processing", "Done", "Cancel"];

    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ message: "Invalid request status" });
    }

    const updatedRequest = await requestService.updateRequestStatus(
      requestDetailId,
      newStatus
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      message: "Request status updated successfully!",
      requestDetail: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createRescueRequest: createRescueRequest,
  getRequests: getRequests,
  acceptRequest: acceptRequest,
  getRequestDetailByDriver: getRequestDetailByDriver,
  updateRequestStatus: updateRequestStatus,
};
