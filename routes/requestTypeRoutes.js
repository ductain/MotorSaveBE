const {
    getRequestTypes,
    getRequestTypeById,
    createRequestType,
    updateRequestType,
    deleteRequestType } = require("../controllers/requestTypeController");

const router = require("express").Router();

router.get("/", getRequestTypes);
router.get("/:id", getRequestTypeById);
router.post("/", createRequestType);
router.put("/:id", updateRequestType);
router.delete("/:id", deleteRequestType);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: RequestTypes
 *   description: API for managing requestTypes
 */

/**
 * @swagger
 * /requestTypes:
 *   get:
 *     summary: Get all requestTypes
 *     tags: [RequestTypes]
 *     responses:
 *       200:
 *         description: List of all requestTypes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: RequestType's ID
 *                   name:
 *                     type: string
 *                     description: RequestType's name
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /requestTypes/{id}:
 *   get:
 *     summary: Get a specific request type by ID
 *     tags: [RequestTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the request type
 *     responses:
 *       200:
 *         description: Details of the specified request type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: RequestType not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /requestTypes:
 *   post:
 *     summary: Create a new request type
 *     tags: [RequestTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: RequestType's name
 *     responses:
 *       200:
 *         description: RequestType created successfully
 *       401:
 *         description: RequestType name already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /requestTypes/{id}:
 *   put:
 *     summary: Update an existing request type
 *     tags: [RequestTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the request type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the request type
 *     responses:
 *       200:
 *         description: RequestType updated successfully
 *       401:
 *         description: RequestType name already exists
 *       404:
 *         description: RequestType not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /requestTypes/{id}:
 *   delete:
 *     summary: Delete a request type
 *     tags: [RequestTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: RequestType's ID
 *     responses:
 *       200:
 *         description: RequestType deleted successfully
 *       404:
 *         description: RequestType not found
 *       500:
 *         description: Internal Server Error
 */