const { verifyToken } = require("../config/verify");
const customerVehicleController = require("../controllers/customerVehicleController");

const router = require("express").Router();

router.get("/", customerVehicleController.getCustomerVehicles);
router.get("/:id", customerVehicleController.getCustomerVehicleById);
router.get("/vehicles/customer", verifyToken, customerVehicleController.getVehiclesByCustomerId);
router.post("/", verifyToken, customerVehicleController.upsertCustomerVehicle);

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
 *   post:
 *     summary: Add or update a customer vehicle
 *     tags: [CVehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - licensePlate
 *               - brandId
 *             properties:
 *               licensePlate:
 *                 type: string
 *                 example: "67AA-148.36"
 *               modelId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Vehicle added or updated successfully
 *       400:
 *         description: Missing required fields
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
 *           format: uuid
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

/**
 * @swagger
 * /customerVehicles/vehicles/customer:
 *   get:
 *     summary: Get vehicles of a customer
 *     tags: [CVehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer vehicles found
 *       404:
 *         description: No vehicle found
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
