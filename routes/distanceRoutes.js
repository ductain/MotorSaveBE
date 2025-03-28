const express = require("express");
const router = express.Router();
const distanceController = require("../controllers/distanceController");
const { verifyAdmin } = require("../config/verify");

router.get("/calculate", distanceController.calculateMoney);
router.get("/", distanceController.getDistanceRate);
router.put("/:id", verifyAdmin, distanceController.updateDistanceRate);

/**
 * @swagger
 * tags:
 *   name: DistanceRate
 *   description: The distance rate managing API
 */

/**
 * @swagger
 * /distance/calculate:
 *   get:
 *     summary: calculate money
 *     tags: [DistanceRate]
 *     parameters:
 *       - in: query
 *         name: distance
 *         schema:
 *           type: number
 *     responses:
 *       201:
 *         description: totalMoney
 *       400:
 *         description: Invalid distance input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /distance:
 *   get:
 *     summary: Get distance rates
 *     tags: [DistanceRate]
 *     responses:
 *       200:
 *         description: return distancerates
 *       400:
 *         description: Invalid distance input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /distance/{id}:
 *   put:
 *     summary: Update an existing distance rate
 *     tags: [DistanceRate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: serial
 *         required: true
 *         description: The unique identifier of the distance rate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moneyperkm
 *             properties:
 *               moneyperkm:
 *                 type: number
 *                 format: float
 *                 description: Updated money for the selected distance rate
 *     responses:
 *       200:
 *         description: DistanceRate updated successfully
 *       404:
 *         description: DistanceRate not found
 *       500:
 *         description: Internal Server Error
 */
module.exports = router;