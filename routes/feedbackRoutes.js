const feedbackController = require("../controllers/feedbackController");
const { verifyToken } = require("../config/verify");

const router = require("express").Router();

router.get("/", feedbackController.getFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.post("/create/:requestdetailid", verifyToken, feedbackController.createFeedback)

/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: API for managing feedbacks
 */

/**
 * @swagger
 * /feedbacks:
 *   get:
 *     summary: Get all feedbacks
 *     tags: [Feedbacks]
 *     responses:
 *       200:
 *         description: List of all feedbacks
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /feedbacks/{id}:
 *   get:
 *     summary: Get feedback by ID
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the feedback
 *     responses:
 *       200:
 *         description: Feedback found
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /feedbacks/create/{requestdetailid}:
 *   post:
 *     summary: Create feedback for a service request
 *     description: Creates feedback for a request based on requestDetailId.
 *     tags: [Feedbacks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestdetailid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request detail to feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comment:
 *                 type: string
 *                 example: "Great service!"
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       400:
 *         description: Bad request (Invalid input)
 *       404:
 *         description: Request detail not found
 *       500:
 *         description: Internal server error
 */

module.exports = router;