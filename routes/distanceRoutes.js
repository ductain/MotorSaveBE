const express = require("express");
const router = express.Router();
const distanceController = require("../controllers/distanceController");

router.get("/calculate", distanceController.calculateMoney);

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

module.exports = router;