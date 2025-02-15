const { verifyToken } = require("../config/verify");
const requestController = require("../controllers/requestController");

const router = require("express").Router();

router.post(
  "/normalRescue",
  verifyToken,
  requestController.createRescueRequest
);

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

module.exports = router;
