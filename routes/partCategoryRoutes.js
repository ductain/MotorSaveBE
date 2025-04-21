const { getPartCategories, getParCatById, createParCat, updateParCat, deleteParCat } = require("../controllers/partCategoryController");

const router = require("express").Router();

router.get("/", getPartCategories);
router.get("/:id", getParCatById);
router.post("/", createParCat);
router.put("/:id", updateParCat);
router.delete("/:id", deleteParCat);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Part Categories
 *   description: API for managing partcategories
 */

/**
 * @swagger
 * /partcategories:
 *   get:
 *     summary: Get all partcategories
 *     tags: [Part Categories]
 *     responses:
 *       200:
 *         description: List of all partcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Part Category's ID
 *                   name:
 *                     type: string
 *                     description: Part Category's name
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /partcategories/{id}:
 *   get:
 *     summary: Get a specific part category by ID
 *     tags: [Part Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the partcategory
 *     responses:
 *       200:
 *         description: Details of the specified partcategory
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
 *         description: Part Category not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /partcategories:
 *   post:
 *     summary: Create a new partcategory
 *     tags: [Part Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Part Category's name
 *     responses:
 *       200:
 *         description: Part Category created successfully
 *       401:
 *         description: Part Category name already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /partcategories/{id}:
 *   put:
 *     summary: Update an existing partcategory
 *     tags: [Part Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the partcategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the partcategory
 *     responses:
 *       200:
 *         description: Part Category updated successfully
 *       401:
 *         description: Part Category name already exists
 *       404:
 *         description: Part Category not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /partcategories/{id}:
 *   delete:
 *     summary: Delete a partcategory
 *     tags: [Part Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Part Category's ID
 *     responses:
 *       200:
 *         description: Part Category deleted successfully
 *       404:
 *         description: Part Category not found
 *       500:
 *         description: Internal Server Error
 */