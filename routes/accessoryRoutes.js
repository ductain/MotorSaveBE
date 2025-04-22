const { verifyManager } = require("../config/verify");
const { getAccessories, getAccessoryById, createAccessory, updateAccessory, deleteAccessory, getAccessoriesByBrandId, getAccessoriesByParCatId, getAcsrByParCatIdAndBrandId } = require("../controllers/accessoryController");

const router = require("express").Router();

router.get("/", getAccessories);
router.get("/brands/:brandId", getAccessoriesByBrandId);
router.get("/partcategories/:parCatId", getAccessoriesByParCatId);
router.get("/parcatandbrand", getAcsrByParCatIdAndBrandId);
router.get("/:id", getAccessoryById);
router.post("/", verifyManager , createAccessory);
router.put("/:id", verifyManager,updateAccessory);
router.delete("/:id", verifyManager,deleteAccessory);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Accessories
 *   description: API for managing accessories
 */

/**
 * @swagger
 * /accessories:
 *   get:
 *     summary: Get all (motorcycle) accessories
 *     tags: [Accessories]
 *     responses:
 *       200:
 *         description: List of all accessories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Accessory's ID
 *                   partcategoryname:
 *                     type: string
 *                     description: Part Category's name
 *                   brandname:
 *                     type: string
 *                     description: Brand's name
 *                   accessoryname:
 *                     type: string
 *                     description: Accessory's name
 *                   cost:
 *                     type: number
 *                     description: Accessory's cost
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /accessories/brands/{brandId}:
 *   get:
 *     summary: Get accessories by brand ID
 *     tags: [Accessories]
 *     parameters:
 *       - in: path
 *         name: brandId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the brand
 *     responses:
 *       200:
 *         description: List of all accessories by brand ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Accessory's ID
 *                   partcategoryname:
 *                     type: string
 *                     description: Part Category's name
 *                   brandname:
 *                     type: string
 *                     description: Brand's name
 *                   accessoryname:
 *                     type: string
 *                     description: Accessory's name
 *                   cost:
 *                     type: number
 *                     description: Accessory's cost
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /accessories/partcategories/{parCatId}:
 *   get:
 *     summary: Get accessories by part category ID
 *     tags: [Accessories]
 *     parameters:
 *       - in: path
 *         name: parCatId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the part category
 *     responses:
 *       200:
 *         description: List of all accessories by part category ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Accessory's ID
 *                   partcategoryname:
 *                     type: string
 *                     description: Part Category's name
 *                   brandname:
 *                     type: string
 *                     description: Brand's name
 *                   accessoryname:
 *                     type: string
 *                     description: Accessory's name
 *                   cost:
 *                     type: number
 *                     description: Accessory's cost
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /accessories/parcatandbrand:
 *   get:
 *     summary: Get accessories by part category ID and brand ID
 *     tags: [Accessories]
 *     parameters:
 *       - in: query
 *         name: parCatId
 *         required: true
 *         schema:
 *           type: number
 *         description: Part category's ID
 *       - in: query
 *         name: brandId
 *         required: true
 *         schema:
 *           type: number
 *         description: Brand's ID
 *     responses:
 *       200:
 *         description: List of accessories filtered by part category ID and brand ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Accessory's ID
 *                   partcategoryname:
 *                     type: string
 *                     description: Part Category's name
 *                   brandname:
 *                     type: string
 *                     description: Brand's name
 *                   accessoryname:
 *                     type: string
 *                     description: Accessory's name
 *                   cost:
 *                     type: number
 *                     description: Accessory's cost
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /accessories/{id}:
 *   get:
 *     summary: Get a specific accessory by ID
 *     tags: [Accessories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the accessory
 *     responses:
 *       200:
 *         description: Details of the specified accessory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                     description: Accessory's ID
 *                   partcategoryname:
 *                     type: string
 *                     description: Part Category's name
 *                   brandname:
 *                     type: string
 *                     description: Brand's name
 *                   accessoryname:
 *                     type: string
 *                     description: Accessory's name
 *                   cost:
 *                     type: number
 *                     description: Accessory's cost
 *       404:
 *         description: Accessory not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /accessories:
 *   post:
 *     summary: Create a new accessory
 *     tags: [Accessories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandId:
 *                 type: number
 *                 description: Brand's Id
 *               name:
 *                 type: string
 *                 description: Accessory's name
 *               cost:
 *                 type: number
 *                 description: Accessory's cost
 *     responses:
 *       200:
 *         description: Accessory created successfully
 *       401:
 *         description: Accessory name already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /accessories/{id}:
 *   put:
 *     summary: Update an existing accessory
 *     tags: [Accessories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the accessory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandId:
 *                 type: number
 *                 description: Brand's Id
 *               name:
 *                 type: string
 *                 description: Accessory's name
 *               cost:
 *                 type: number
 *                 description: Accessory's cost
 *     responses:
 *       200:
 *         description: Accessory updated successfully
 *       401:
 *         description: Accessory name already exists
 *       404:
 *         description: Accessory not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /accessories/{id}:
 *   delete:
 *     summary: Delete a accessory
 *     tags: [Accessories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Accessory's ID
 *     responses:
 *       200:
 *         description: Accessory deleted successfully
 *       404:
 *         description: Accessory not found
 *       500:
 *         description: Internal Server Error
 */