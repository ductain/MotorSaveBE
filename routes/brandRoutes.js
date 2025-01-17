const {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand } = require("../controllers/brandController");

const router = require("express").Router();

router.get("/", getBrands);
router.get("/:id", getBrandById);
router.post("/", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: API for managing brands
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all (motorcycle) brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Brand's ID
 *                   name:
 *                     type: string
 *                     description: Brand's name
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Get a specific brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the brand
 *     responses:
 *       200:
 *         description: Details of the specified brand
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 rate:
 *                   type: number
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Brand's name
 *     responses:
 *       200:
 *         description: Brand created successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Update an existing brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the brand
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the brand
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Brand's ID
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal Server Error
 */