const {
  getSerPackages,
  getSerPacById,
  createSerPackage,
  updateSerPackage,
  deleteSerPackage, 
  getSerPacByName} = require("../controllers/serPackageController");
const { verifyAdmin } = require("../config/verify");

const router = require("express").Router();

router.get("/", getSerPackages);
router.get("/findByName", getSerPacByName);
router.get("/:id", getSerPacById);
router.post("/", verifyAdmin, createSerPackage);
router.put("/:id", verifyAdmin, updateSerPackage);
router.delete("/:id", verifyAdmin, deleteSerPackage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ServicePackages
 *   description: API for managing service packages
 */

/**
 * @swagger
 * /servicepackages:
 *   get:
 *     summary: Get all service packages
 *     tags: [ServicePackages]
 *     responses:
 *       200:
 *         description: List of all service packages
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
 *                     description: Unique identifier of the service package
 *                   name:
 *                     type: string
 *                     description: Name of the service package
 *                   description:
 *                     type: string
 *                     description: Description of the service package
 *                   rate:
 *                     type: number
 *                     format: float
 *                     description: Rate of the service package
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /servicepackages/{id}:
 *   get:
 *     summary: Get a specific service package by ID
 *     tags: [ServicePackages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The unique identifier of the service package
 *     responses:
 *       200:
 *         description: Details of the specified service package
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 rate:
 *                   type: number
 *                   format: float
 *       404:
 *         description: ServicePackage not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /servicepackages/findByName:
 *   get:
 *     summary: Get a specific service package by name
 *     tags: [ServicePackages]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the service package (supports Vietnamese characters)
 *     responses:
 *       200:
 *         description: Details of the specified service package
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 rate:
 *                   type: number
 *                   format: float
 *       404:
 *         description: ServicePackage not found
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /servicepackages:
 *   post:
 *     summary: Create a new service package
 *     tags: [ServicePackages]
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
 *               - rate
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the service package
 *               description:
 *                 type: string
 *                 description: Description of the service package
 *               rate:
 *                 type: number
 *                 format: float
 *                 description: Rate of the service package
 *     responses:
 *       200:
 *         description: ServicePackage created successfully
 *       401:
 *         description: ServicePackage name already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /servicepackages/{id}:
 *   put:
 *     summary: Update an existing service package
 *     tags: [ServicePackages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The unique identifier of the service package
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - rate
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the service package
 *               description:
 *                 type: string
 *                 description: Updated description of the service package
 *               rate:
 *                 type: number
 *                 format: float
 *                 description: Updated rate of the service package
 *     responses:
 *       200:
 *         description: ServicePackage updated successfully
 *       401:
 *         description: ServicePackage name already exists
 *       404:
 *         description: ServicePackage not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /servicepackages/{id}:
 *   delete:
 *     summary: Delete a service package
 *     tags: [ServicePackages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The unique identifier of the service package
 *     responses:
 *       200:
 *         description: ServicePackage deleted successfully
 *       404:
 *         description: ServicePackage not found
 *       500:
 *         description: Internal Server Error
 */

