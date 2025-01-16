const customerVehicleController = require("../controllers/customerVehicleController");

const router = require("express").Router();

router.get("/", customerVehicleController.getCustomerVehicles);
router.get("/:id", customerVehicleController.getCustomerVehicleById);

/**
 * @swagger
 * tags:
 *   name: CVehicles
 *   description: API for managing customer vehicles
 */

/**
 * @swagger
 * /customerVehicles:
 *   get:
 *     summary: Get all customer vehicles
 *     tags: [CVehicles]
 *     responses:
 *       200:
 *         description: List of all customer vehicles
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /customerVehicles/{id}:
 *   get:
 *     summary: Get customer vehicle by ID
 *     tags: [CVehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the customer vehicle
 *     responses:
 *       200:
 *         description: Customer vehicle found
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
