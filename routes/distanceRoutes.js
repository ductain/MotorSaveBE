const express = require("express");
const router = express.Router();
const distanceController = require("../controllers/distanceController");

router.post("/calculate", distanceController.calculateMoney);

/**
 * @swagger
 * tags:
 *   name: DistanceRate
 *   description: The distance rate managing API
 */

/**
 * @swagger
 * /distance/calculate:
 *   post:
 *     summary: calculate money
 *     tags: [DistanceRate]
 *     requestBody:
 *      required: true
 *      description: Input distance (m)
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      distance:
 *                          type: number
 *     responses:
 *       201:
 *         description: totalMoney
 *       400:
 *         description: Invalid distance input
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;