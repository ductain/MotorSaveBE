const { getModels, getModelById, createModel, updateModel, deleteModel } = require("../controllers/vehicleModelController");

const router = require("express").Router();

router.get("/", getModels);
router.get("/:id", getModelById);
router.post("/", createModel);
router.put("/:id", updateModel);
router.delete("/:id", deleteModel);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Vehicle Models
 *   description: API for managing vehiclemodels
 */

/**
 * @swagger
 * /vehiclemodels:
 *   get:
 *     summary: Get all vehiclemodels
 *     tags: [Vehicle Models]
 *     responses:
 *       200:
 *         description: List of all vehiclemodels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                 id:
 *                   type: integer
 *                 brandname:
 *                   type: string
 *                 modelname:
 *                   type: string
 *                 modelrate:
 *                   type: number
 *                   format: float
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /vehiclemodels/{id}:
 *   get:
 *     summary: Get a specific vehicle model by ID
 *     tags: [Vehicle Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the vehiclemodel
 *     responses:
 *       200:
 *         description: Details of the specified vehiclemodel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 brandname:
 *                   type: string
 *                 modelname:
 *                   type: string
 *                 modelrate:
 *                   type: number
 *                   format: float
 *       404:
 *         description: Vehicle Model not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /vehiclemodels:
 *   post:
 *     summary: Create a new vehiclemodel
 *     tags: [Vehicle Models]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandId:
 *                 type: string
 *                 description: Brand's id
 *               name:
 *                 type: string
 *                 description: Vehicle Model's name
 *               rate:
 *                 type: number
 *                 format: float
 *                 description: Updated rate of the model
 *     responses:
 *       200:
 *         description: Vehicle Model created successfully
 *       401:
 *         description: Vehicle Model name already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /vehiclemodels/{id}:
 *   put:
 *     summary: Update an existing vehiclemodel
 *     tags: [Vehicle Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the vehiclemodel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandId:
 *                 type: string
 *                 description: Brand's id
 *               name:
 *                 type: string
 *                 description: Vehicle Model's name
 *               rate:
 *                 type: number
 *                 format: float
 *                 description: Updated rate of the model
 *     responses:
 *       200:
 *         description: Vehicle Model updated successfully
 *       401:
 *         description: Vehicle Model name already exists
 *       404:
 *         description: Vehicle Model not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /vehiclemodels/{id}:
 *   delete:
 *     summary: Delete a vehiclemodel
 *     tags: [Vehicle Models]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Vehicle Model's ID
 *     responses:
 *       200:
 *         description: Vehicle Model deleted successfully
 *       404:
 *         description: Vehicle Model not found
 *       500:
 *         description: Internal Server Error
 */