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

const getAllPendingRescueRequests = async (req, res) => {
  try {
    const requests = await requestService.getAllPendingRescueRequests();
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

    res
      .status(200)
      .json({
        message: "Request accepted successfully!",
        requestDetail: updatedRequest,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createRescueRequest: createRescueRequest,
  getAllPendingRescueRequests: getAllPendingRescueRequests,
  acceptRequest: acceptRequest,
};
