const { verifyToken, verifyDriver } = require("../config/verify");
const requestController = require("../controllers/requestController");

const router = require("express").Router();

router.post(
  "/normalRescue",
  verifyToken,
  requestController.createRescueRequest
);

router.get(
  "/driver",
  verifyDriver,
  requestController.getRequestsByDriver
);

router.put("/:requestDetailId/accept", verifyDriver, requestController.acceptRequest);

router.get("/driver/:requestDetailId", verifyToken, requestController.getRequestDetailByDriver);

router.put("/:requestDetailId/status", verifyToken, requestController.updateRequestStatus);

router.put("/:requestDetailId/cancel", verifyToken, requestController.cancelRequestWithReason);

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: The request managing API
 */

/**
 * @swagger
 * /requests/normalRescue:
 *   post:
 *     summary: Create a new rescue request
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pickuplong:
 *                 type: number
 *               pickuplat:
 *                 type: number
 *               deslng:
 *                 type: number
 *               deslat:
 *                 type: number
 *               pickuplocation:
 *                 type: string
 *               destination:
 *                 type: string
 *               totalprice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Rescue request created successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /requests/driver:
 *   get:
 *     summary: Get all requests (Driver)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of requests
 *       403:
 *         description: You need to login as Driver or Admin
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /requests/{requestDetailId}/accept:
 *   put:
 *     summary: Accept a rescue request (Driver)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestDetailId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request detail to accept
 *     responses:
 *       200:
 *         description: Request accepted successfully
 *       403:
 *         description: You need to login as Driver or Admin
 *       404:
 *         description: Request not found or already accepted
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /requests/driver/{requestDetailId}:
 *   get:
 *     summary: Get request details
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestDetailId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request detail
 *     responses:
 *       200:
 *         description: Successfully retrieved request details
 *       400:
 *         description: Invalid request status.
 *       404:
 *         description: Request not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /requests/{requestDetailId}/status:
 *   put:
 *     summary: Update request status
 *     description: Update the status of a request (Pickup, Processing, Done, or Cancel).
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestDetailId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request detail to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newStatus:
 *                 type: string
 *                 enum: [Pickup, Processing, Done, Cancel]
 *                 example: Processing
 *     responses:
 *       200:
 *         description: Request status updated successfully.
 *       400:
 *         description: Invalid request status.
 *       404:
 *         description: Request not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /requests/{requestDetailId}/cancel:
 *   put:
 *     summary: Cancel request
 *     description: Cancel request with reason
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestDetailId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request detail to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *                 example: Tôi thích huỷ đó thì làm sao?
 *     responses:
 *       200:
 *         description: Request status updated successfully.
 *       400:
 *         description: Invalid request status.
 *       404:
 *         description: Request not found.
 *       500:
 *         description: Internal Server Error.
 */
module.exports = router;
