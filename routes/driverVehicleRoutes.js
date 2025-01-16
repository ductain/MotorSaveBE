const driverVehicleController = require("../controllers/driverVehicleController");

const router = require("express").Router();

router.get("/", driverVehicleController.getDriverVehicles);
router.get("/:id", driverVehicleController.getDriverVehicleById);

/**
 * @swagger
 * tags:
 *   name: DVehicles
 *   description: API for managing driver vehicles
 */

/**
 * @swagger
 * /driverVehicles:
 *   get:
 *     summary: Get all driver vehicles
 *     tags: [DVehicles]
 *     responses:
 *       200:
 *         description: List of all driver vehicles
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /driverVehicles/{id}:
 *   get:
 *     summary: Get driver vehicle by ID
 *     tags: [DVehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the driver vehicle
 *     responses:
 *       200:
 *         description: Driver vehicle found
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;