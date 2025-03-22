const express = require("express");
const { verifyMechanic } = require("../config/verify");
const {
  getRepairQuotes,
  getRepairQuoteById,
  createRepairQuote,
  updateRepairQuote,
  deleteRepairQuote,
  getRepairQuotesByRequestDetailId,
} = require("../controllers/repairQuoteController");

const router = express.Router();

router.get("/", getRepairQuotes);
router.get("/requestdetail/:requestDetailId", getRepairQuotesByRequestDetailId);
router.get("/:id", getRepairQuoteById);
router.post("/", verifyMechanic, createRepairQuote);
router.put("/:id", verifyMechanic, updateRepairQuote);
router.delete("/:id", verifyMechanic, deleteRepairQuote);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: RepairQuotes
 *   description: API for managing repair quotes
 */

/**
 * @swagger
 * /repairquotes:
 *   get:
 *     summary: Get all repair quotes
 *     tags: [RepairQuotes]
 *     responses:
 *       200:
 *         description: List of all repair quotes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /repairquotes/requestdetail/{requestDetailId}:
 *   get:
 *     summary: Get repair quotes by request detail ID
 *     tags: [RepairQuotes]
 *     parameters:
 *       - name: requestDetailId
 *         in: path
 *         required: true
 *         schema:
 *            type: string
 *            format: uuid
 *            description: Unique identifier of the request Detail
 *         description: The ID of the request detail
 *     responses:
 *       200:
 *         description: List of repair quotes related to the request detail ID
 *       404:
 *         description: No repair quotes found
 */

/**
 * @swagger
 * /repairquotes/{id}:
 *   get:
 *     summary: Get a repair quote by ID
 *     tags: [RepairQuotes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *            type: string
 *            format: uuid
 *            description: Unique identifier of the repair quote
 *     responses:
 *       200:
 *         description: The requested repair quote
 *       404:
 *         description: Repair quote not found
 */

/**
 * @swagger
 * /repairquotes:
 *   post:
 *     summary: Create a new repair quote
 *     tags: [RepairQuotes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - detail
 *               - cost
 *               - requestdetailid
 *               - repaircostpreviewid
 *             properties:
 *               detail:
 *                 type: string
 *                 example: "Brake pad replacement and rotor resurfacing"
 *               cost:
 *                 type: integer
 *                 example: 150
 *               requestdetailid:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               repaircostpreviewid:
 *                 type: string
 *                 format: uuid
 *                 example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       201:
 *         description: Repair quote successfully created
 *       400:
 *         description: Bad request (invalid data format)
 *       403:
 *         description: Unauthorized (only mechanics can create a repair quote)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /repairquotes/{id}:
 *   put:
 *     summary: Update a repair quote
 *     tags: [RepairQuotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *            type: string
 *            format: uuid
 *            description: Unique identifier of the request Detail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - detail
 *               - cost
 *             properties:
 *               detail:
 *                 type: string
 *                 example: "Updated brake pad replacement details"
 *               cost:
 *                 type: integer
 *                 example: 180
 *     responses:
 *       200:
 *         description: Repair quote successfully updated
 *       400:
 *         description: Bad request (invalid data format)
 *       403:
 *         description: Unauthorized (only mechanics can update a repair quote)
 *       404:
 *         description: Repair quote not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /repairquotes/{id}:
 *   delete:
 *     summary: Delete a repair quote
 *     tags: [RepairQuotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *            type: string
 *            format: uuid
 *            description: Unique identifier of the request Detail
 *     responses:
 *       200:
 *         description: Repair quote successfully deleted
 *       403:
 *         description: Unauthorized (only mechanics can delete a repair quote)
 *       404:
 *         description: Repair quote not found
 */

