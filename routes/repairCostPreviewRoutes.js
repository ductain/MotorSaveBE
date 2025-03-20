const { verifyAdmin } = require("../config/verify");
const { createRepairCostPreview, getRepairCostPreviews, getRepairCostPreviewById, updateRepairCostPreview, deleteRepairCostPreview } = require("../controllers/repairCostPreviewController");

const router = require("express").Router();

router.get("/", getRepairCostPreviews);
router.get("/:id", getRepairCostPreviewById);
router.post("/",
    verifyAdmin,
    createRepairCostPreview);
router.put("/:id",
    verifyAdmin,
    updateRepairCostPreview);
router.delete("/:id",
    verifyAdmin,
    deleteRepairCostPreview);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: RepairCostPreviews
 *   description: API for managing repair cost preivews
 */

/**
 * @swagger
 * /repaircostpreviews:
 *   get:
 *     summary: Get all repair cost preivews
 *     tags: [RepairCostPreviews]
 *     responses:
 *       200:
 *         description: List of all repair cost preivews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     description: Unique identifier of the repair cost preivew
 *                   name:
 *                     type: string
 *                     description: Name of the repair cost preivew
 *                   description:
 *                     type: string
 *                     description: Description of the repair cost preivew
 *                   min:
 *                     type: number
 *                     format: integer
 *                     description: Minimum cost of the repair cost preivew
 *                   max:
 *                     type: number
 *                     format: integer
 *                     description: Maximum cost of the repair cost preivew
 *                   managedby:
 *                     type: string
 *                     format: string
 *                     description: the id of the admin
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /repaircostpreviews/{id}:
 *   get:
 *     summary: Get a specific repair cost preivew by ID
 *     tags: [RepairCostPreviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: serial
 *         required: true
 *         description: The unique identifier of the repair cost preivew
 *     responses:
 *       200:
 *         description: Details of the specified repair cost preivew
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                     type: number
 *                     format: serial
 *                     description: Unique identifier of the repair cost preivew
 *                 name:
 *                     type: string
 *                     description: Name of the repair cost preivew
 *                 description:
 *                     type: string
 *                     description: Description of the repair cost preivew
 *                 min:
 *                     type: number
 *                     format: integer
 *                     description: Minimum cost of the repair cost preivew
 *                 max:
 *                     type: number
 *                     format: integer
 *                     description: Maximum cost of the repair cost preivew
 *                 managedby:
 *                     type: string
 *                     format: uuid
 *                     description: the id of the admin
 *       404:
 *         description: RepairCostPreview not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /repaircostpreviews:
 *   post:
 *     summary: Create a new repair cost preivew
 *     tags: [RepairCostPreviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - min
 *               - max
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the repair cost preivew
 *               description:
 *                 type: string
 *                 description: Description of the repair cost preivew
 *               min:
 *                 type: number
 *                 format: integer
 *                 description: Minimum cost of the repair cost preivew
 *               max:
 *                 type: number
 *                 format: integer
 *                 description: Maximum cost of the repair cost preivew
 *     responses:
 *       200:
 *         description: RepairCostPreview created successfully
 *       401:
 *         description: RepairCostPreview name already exists
 *       403:
 *         description: You need to login as Admin
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /repaircostpreviews/{id}:
 *   put:
 *     summary: Update an existing repair cost preivew
 *     tags: [RepairCostPreviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: serial
 *         required: true
 *         description: The unique identifier of the repair cost preivew
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - min
 *               - max
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the repair cost preivew
 *               description:
 *                 type: string
 *                 description: Updated description of the repair cost preivew
 *               min:
 *                 type: number
 *                 format: integer
 *                 description: Minimum cost of the repair cost preivew
 *               max:
 *                 type: number
 *                 format: integer
 *                 description: Maximum cost of the repair cost preivew
 *     responses:
 *       200:
 *         description: RepairCostPreview updated successfully
 *       401:
 *         description: RepairCostPreview name already exists
 *       403:
 *         description: You need to login as Admin
 *       404:
 *         description: RepairCostPreview not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /repaircostpreviews/{id}:
 *   delete:
 *     summary: Delete a repair cost preivew
 *     tags: [RepairCostPreviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: serial
 *         required: true
 *         description: The unique identifier of the repair cost preivew
 *     responses:
 *       200:
 *         description: RepairCostPreview deleted successfully
 *       403:
 *         description: You need to login as Admin
 *       404:
 *         description: RepairCostPreview not found
 *       500:
 *         description: Internal Server Error
 */

