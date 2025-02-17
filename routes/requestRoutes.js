const { verifyToken, verifyDriver } = require("../config/verify");
const requestController = require("../controllers/requestController");

const router = require("express").Router();

router.post(
  "/normalRescue",
  verifyToken,
  requestController.createRescueRequest
);

router.get(
  "/pending",
  verifyDriver,
  requestController.getAllPendingRescueRequests
);

router.put("/:requestDetailId/accept", verifyDriver, requestController.acceptRequest);

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
 * /requests/pending:
 *   get:
 *     summary: Get all pending rescue requests (Driver)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending rescue requests
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

module.exports = router;
