const feedbackController = require("../controllers/feedbackController");

const router = require("express").Router();

router.get("/", feedbackController.getFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);

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

module.exports = router;