const { verifyManager } = require("../config/verify");
const { createRepairCostPreview, getRepairCostPreviews, getRepairCostPreviewById, updateRepairCostPreview, deleteRepairCostPreview } = require("../controllers/repairCostPreviewController");

const router = require("express").Router();

router.get("/", getRepairCostPreviews);
router.get("/:id", getRepairCostPreviewById);
router.post("/",
    verifyManager,
    createRepairCostPreview);
router.put("/:id",
    verifyManager,
    updateRepairCostPreview);
router.delete("/:id",
    verifyManager,
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
 *                   repairpackagename:
 *                     type: string
 *                     description: Name of the repair package
 *                   partcategoryname:
 *                     type: string
 *                     description: Name of the part category
 *                   partcategoryid:
 *                     type: number
 *                     description: Id of the part category
 *                   min:
 *                     type: number
 *                     format: integer
 *                     description: Minimum cost of the repair cost preivew
 *                   max:
 *                     type: number
 *                     format: integer
 *                     description: Maximum cost of the repair cost preivew
 *                   wage:
 *                     type: number
 *                     format: integer
 *                     description: Default wage of the repair cost preivew
 *                   rate:
 *                     type: number
 *                     format: integer
 *                     description: Wage rate based on part category
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
 *                   repairpackagename:
 *                     type: string
 *                     description: Name of the repair package
 *                   partcategoryname:
 *                     type: string
 *                     description: Name of the part category
 *                   partcategoryid:
 *                     type: number
 *                     description: Id of the part category
 *                   min:
 *                     type: number
 *                     format: integer
 *                     description: Minimum cost of the repair cost preivew
 *                   max:
 *                     type: number
 *                     format: integer
 *                     description: Maximum cost of the repair cost preivew
 *                   wage:
 *                     type: number
 *                     format: integer
 *                     description: Default wage of the repair cost preivew
 *                   rate:
 *                     type: number
 *                     format: integer
 *                     description: Wage rate based on part category
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
 *               wage:
 *                 type: number
 *                 description: Wage of the repair cost preview
 *               repairpackageid:
 *                 type: number
 *                 format: integer
 *                 description: Repair package of the repair cost preview
 *               rate:
 *                 type: number
 *                 description: Rate for calculating the repair rate (for repair that requires accessories)
 *               partcategoryid:
 *                 type: number
 *                 format: integer
 *                 description: ID of the part category
 *     responses:
 *       200:
 *         description: RepairCostPreview created successfully
 *       401:
 *         description: RepairCostPreview name already exists
 *       403:
 *         description: You need to login as Admin
 *       406:
 *         description: The rate for calculating wage must be equal or smaller than 0.5
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
 *               wage:
 *                 type: number
 *                 description: Wage of the repair cost preview
 *               repairpackageid:
 *                 type: number
 *                 format: integer
 *                 description: Repair package of the repair cost preview
 *               rate:
 *                 type: number
 *                 description: Rate for calculating the repair rate (for repair that requires accessories)
 *               partcategoryid:
 *                 type: number
 *                 format: integer
 *                 description: ID of the part category 
 *     responses:
 *       200:
 *         description: RepairCostPreview updated successfully
 *       401:
 *         description: RepairCostPreview name already exists
 *       403:
 *         description: You need to login as Admin
 *       404:
 *         description: RepairCostPreview not found
 *       406:
 *         description: The rate for calculating wage must be equal or smaller than 0.5
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

