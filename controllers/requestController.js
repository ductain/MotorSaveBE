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

const createEmergencyRescueRequest = async (req, res) => {
  try {
    const customerId = req.user.id; // Assuming user ID comes from JWT
    const result = await requestService.createEmergencyRescueRequest(
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

const createEmergencyRescueRequestForGuest = async (req, res) => {
  try {
    const result = await requestService.createEmergencyRescueRequestForGuest(
      req.body,
    );
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const createFloodRescueRequest = async (req, res) => {
  try {
    const customerId = req.user.id; // Assuming user ID comes from JWT
    const result = await requestService.createFloodRescueRequest(
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

const createRepairRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await requestService.createRepairRequest(
      requestId
    );

    if (!request) {
      return res
        .status(404)
        .json({ message: "Request id not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getRequestsByDriver = async (req, res) => {
  try {
    const staffid = req.user.id;
    const requests = await requestService.getRequestsByDriver(staffid);
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getPendingRepairRequestsByMechanic = async (req, res) => {
  try {
    const staffid = req.user.id;
    const pendingRepairRequests = await requestService.getPendingRepairRequestsByMechanic(staffid);
    res.status(200).json(pendingRepairRequests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getPendingReturnRequestsByDriver = async (req, res) => {
  try {
    const staffid = req.user.id;
    const pendingReturnRequests = await requestService.getPendingReturnRequestsByDriver(staffid);
    res.status(200).json(pendingReturnRequests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getUndoneRequestDetailIdsByDriver = async (req, res) => {
  try {
    const staffid = req.user.id;
    const undoneRequests = await requestService.getUndoneRequests(staffid);
    res.status(200).json(undoneRequests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

const acceptRepairRequest = async (req, res) => {
  try {
    const { requestDetailId } = req.params;
    const mechanicId = req.user.id; // Get driver ID from authenticated token

    // Check undone requests count
    const undoneRequests = await requestService.getUndoneRequests(mechanicId);

    if (undoneRequests.length > 1) {
      return res.status(400).json({
        message: "You have more than one undone request, cannot accept another."
      });
    }

    const updatedRequest = await requestService.acceptRepairRequest(
      requestDetailId,
      mechanicId
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .json({ message: "Repair request not found or already accepted" });
    }

    res.status(200).json({
      message: "Repair request accepted successfully!",
      requestDetail: updatedRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const acceptRepairQuote = async (req, res) => {
  try {
    const { requestDetailId } = req.params;

    const updatedRequest = await requestService.acceptRepairQuote(
      requestDetailId,
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .json({ message: "Repair request not found or already accepted" });
    }

    res.status(200).json({
      message: "Repair quote accepted successfully!",
      requestDetail: updatedRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getRepairRequestsByMechanic = async (req, res) => {
  try {
    const staffid = req.user.id;
    const repairRequests = await requestService.getRepairRequestsByMechanic(staffid);
    res.status(200).json(repairRequests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getRequestsByCustomer = async (req, res) => {
  try {
    const userid = req.user.id;
    const requests = await requestService.getRequestsByCustomer(userid);
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

    // Check undone requests count
    const undoneRequestCount = await requestService.getUndoneRequests(driverId);

    if (undoneRequestCount > 1) {
      return res.status(400).json({
        message: "You have more than one undone request, cannot accept another."
      });
    }

    // Proceed with accepting request
    const updatedRequest = await requestService.acceptRequest(requestDetailId, driverId);

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found or already accepted by others." });
    }

    res.status(200).json({
      message: "Request accepted successfully!",
      requestDetail: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
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

const updateReturnRequestStatus = async (req, res) => {
  try {
    const { requestDetailId } = req.params;
    const { newStatus } = req.body;
    const validStatuses = ["Pending", "Processing", "Done", "Cancel"];

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
      message: "Return request status updated successfully!",
      requestDetail: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const updateRepairRequestStatus = async (req, res) => {
  try {
    const { requestDetailId } = req.params;
    const { newStatus } = req.body;
    const validStatuses = ["Inspecting", "Waiting", "Cancel", "Accepted", "Repairing", "Done"];

    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ message: "Invalid request status" });
    }

    if (newStatus === "Waiting") {
      const total = await requestService.calculateTotalPrice(requestDetailId);
      await requestService.updateTotalPrice(requestDetailId, total);
    }
    if (newStatus === "Done") {
      const returnRequestId = await requestService.getReturnReqByRepairId(requestDetailId);
      await requestService.updateRequestStatus(returnRequestId, 'Pending');
    }
    const updatedRequest = await requestService.updateRequestStatus(requestDetailId, newStatus);

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      message: "Repair request status updated successfully!",
      requestDetail: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const cancelRequestWithReason = async (req, res) => {
  try {
    const { requestDetailId } = req.params;
    const { note } = req.body;

    if (!note) {
      return res.status(400).json({ error: "Note is required" });
    }

    const result = await requestService.cancelRequestWithReason(requestDetailId, note);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Not Found") {
      return res.status(404).json({ error: "Request not found" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRepairRequestDetail = async (req, res) => {
  try {
    const { requestId } = req.params;

    const requestDetail = await requestService.getRepairRequestDetail(
      requestId
    );

    if (!requestDetail) {
      return res.status(404).json({ message: "Repair Request not found" });
    }
    res.status(200).json(requestDetail);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRepairRequestDetailForMechanic = async (req, res) => {
  try {
    const { requestId } = req.params;

    const requestDetail = await requestService.getRepairRequestDetailForMechanic(
      requestId
    );

    if (!requestDetail) {
      return res.status(404).json({ message: "Repair Request not found" });
    }
    res.status(200).json(requestDetail);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createReturnRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const result = await requestService.createReturnRequest(
      req.body,
      requestId
    );
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getLatestRequestDetail = async (req, res) => {
  try {
    const { requestId } = req.params;

    const requestDetail = await requestService.getLatestRequestDetail(
      requestId
    );

    if (!requestDetail) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(requestDetail);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReturnRequestDetail = async (req, res) => {
  try {
    const { requestId } = req.params;

    const requestDetail = await requestService.getReturnRequestDetail(
      requestId
    );

    if (!requestDetail) {
      return res.status(404).json({ message: "Return vehicle request not found" });
    }
    res.status(200).json(requestDetail);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTotalRequests = async (req, res) => {
  try {
    const totalRequests = await requestService.getTotalRequests()
    return res.status(200).json({ totalRequests });
  } catch (error) {
    console.error("Error fetching total requests:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTotalRequestsByDate = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || isNaN(year) || !month || isNaN(month)) {
      return res.status(400).json({ message: "Invalid year or month parameter" });
    }

    const totalRequestsByDate = await requestService.getTotalRequestsByDate(Number(year), Number(month));

    return res.status(200).json({ totalRequestsByDate });
  } catch (error) {
    console.error("Error fetching total requests by date:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await requestService.getAllRequests();
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};



module.exports = {
  createRescueRequest: createRescueRequest,
  createEmergencyRescueRequest: createEmergencyRescueRequest,
  createEmergencyRescueRequestForGuest,
  createFloodRescueRequest: createFloodRescueRequest,
  createRepairRequest: createRepairRequest,
  getPendingRepairRequestsByMechanic,
  getPendingReturnRequestsByDriver,
  acceptRepairRequest,
  acceptRepairQuote: acceptRepairQuote,
  getRepairRequestsByMechanic,
  getRequestsByDriver: getRequestsByDriver,
  getRequestsByCustomer: getRequestsByCustomer,
  getUndoneRequestDetailIdsByDriver,
  acceptRequest: acceptRequest,
  getRequestDetailByDriver: getRequestDetailByDriver,
  updateRequestStatus: updateRequestStatus,
  updateRepairRequestStatus,
  updateReturnRequestStatus,
  cancelRequestWithReason: cancelRequestWithReason,
  getRepairRequestDetail,
  getRepairRequestDetailForMechanic,
  createReturnRequest: createReturnRequest,
  getLatestRequestDetail: getLatestRequestDetail,
  getReturnRequestDetail: getReturnRequestDetail,
  getTotalRequests: getTotalRequests,
  getTotalRequestsByDate: getTotalRequestsByDate,
  getAllRequests,
};
