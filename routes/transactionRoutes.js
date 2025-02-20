const { verifyToken } = require("../config/verify");
const transactionController = require("../controllers/transactionController");

const router = require("express").Router();

router.post("/", verifyToken, transactionController.createTransaction);

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: The transaction managing API
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestdetailid:
 *                 type: string
 *               zptransid:
 *                 type: string
 *               totalamount:
 *                 type: number
 *               paymentmethod:
 *                 type: string
 *               paymentstatus:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
