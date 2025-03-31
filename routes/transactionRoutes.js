const { verifyToken, verifyAdmin } = require("../config/verify");
const transactionController = require("../controllers/transactionController");

const router = require("express").Router();

router.post("/", verifyToken, transactionController.createTransaction);
router.post("/payment", verifyToken, transactionController.createPayment);
router.put("/payment/update", verifyToken, transactionController.updatePaymentStatus);
router.put("/payment/info/:requestdetailid", verifyToken, transactionController.updatePaymentInfo);
router.get("/payment/unpaid/request/:id", verifyToken, transactionController.getUnpaiPaymentsByRequestId);
router.get("/totalRevenue", verifyAdmin, transactionController.getTotalRevenue);
router.get("/totalRevenue/:year", verifyAdmin, transactionController.getTotalRevenueByMonth);

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

/**
 * @swagger
 * /transactions/payment:
 *   post:
 *     summary: Create a new payment
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
 *               totalamount:
 *                 type: number
 *               paymentmethod:
 *                 type: string
 *               paymentstatus:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transactions/payment/update:
 *   put:
 *     summary: Update an existing payment
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requestDetailId
 *               - newStatus
 *             properties:
 *               requestDetailId:
 *                 type: string
 *                 description: the requestdetailid of the payment
 *               newStatus:
 *                 type: string
 *                 enum: [Success, Failed]
 *                 example: Success
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transactions/payment/info/{requestdetailid}:
 *   put:
 *     summary: Update an existing payment infomation
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestdetailid
 *         required: true
 *         schema:
 *           type: string
 *         description: The request detail id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentmethod
 *               - paymentstatus
 *             properties:
 *               paymentmethod:
 *                 type: string
 *                 description: the payment method
 *               paymentstatus:
 *                 type: string
 *                 description: the payment status
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transactions/payment/unpaid/request/{id}:
 *   get:
 *     summary: Get unpaid Payments by requestId
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the request
 *     responses:
 *       200:
 *         description: List of unpaid payments
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transactions/totalRevenue:
 *   get:
 *     summary: Get total revenue (Admin)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: total revenue
 *       403:
 *         description: You need to login as Driver or Admin
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transactions/totalRevenue/{year}:
 *   get:
 *     summary: Get total revenue by month (Admin)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *         description: The year
 *     responses:
 *       200:
 *         description: total revenue in month
 *       403:
 *         description: You need to login as Driver or Admin
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
