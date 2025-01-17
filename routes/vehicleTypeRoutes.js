const {
    createVehicleType,
    getVehicleTypes,
    getVehicleTypeById,
    updateVehicleType,
    deleteVehicleType } = require("../controllers/vehicleTypeController");

const router = require("express").Router();

router.get("/", getVehicleTypes);
router.get("/:id", getVehicleTypeById);
router.post("/", createVehicleType);
router.put("/:id", updateVehicleType);
router.delete("/:id", deleteVehicleType);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: VehicleTypes
 *   description: API for managing vehicle types
 */

/**
 * @swagger
 * /vehicletypes:
 *   get:
 *     summary: Get all vehicle types
 *     tags: [VehicleTypes]
 *     responses:
 *       200:
 *         description: List of all vehicle types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The vehicle type ID
 *                   name:
 *                     type: string
 *                     description: The name of the vehicle type
 *                   rate:
 *                     type: number
 *                     description: The rate associated with the vehicle type
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /vehicletypes/{id}:
 *   get:
 *     summary: Get a specific vehicle type by ID
 *     tags: [VehicleTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the vehicle type
 *     responses:
 *       200:
 *         description: Details of the specified vehicle type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 rate:
 *                   type: number
 *       404:
 *         description: Vehicle type not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /vehicletypes:
 *   post:
 *     summary: Create a new vehicle type
 *     tags: [VehicleTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the vehicle type
 *               rate:
 *                 type: number
 *                 description: The rate associated with the vehicle type
 *     responses:
 *       200:
 *         description: Vehicle type created successfully
 *       401:
 *         description: Vehicle type already exists 
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /vehicletypes/{id}:
 *   put:
 *     summary: Update an existing vehicle type
 *     tags: [VehicleTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the vehicle type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the vehicle type
 *               rate:
 *                 type: number
 *                 description: Updated rate of the vehicle type
 *     responses:
 *       200:
 *         description: Vehicle type updated successfully
 *       401:
 *         description: Vehicle type already exists
 *       404:
 *         description: Vehicle type not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /vehicletypes/{id}:
 *   delete:
 *     summary: Delete a vehicle type
 *     tags: [VehicleTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the vehicle type
 *     responses:
 *       200:
 *         description: Vehicle type deleted successfully
 *       404:
 *         description: Vehicle type not found
 *       500:
 *         description: Internal Server Error
 */