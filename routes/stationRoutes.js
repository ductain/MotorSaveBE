const {
  getStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");
const { verifyAdmin, verifyManager } = require("../config/verify");

const router = require("express").Router();

router.get("/", getStations);
router.get("/:id", getStationById);
router.post("/", verifyManager, createStation);
router.put("/:id", verifyManager, updateStation);
router.delete("/:id", verifyManager, deleteStation);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: API for managing stations
 */

/**
 * @swagger
 * /stations:
 *   get:
 *     summary: Get all stations
 *     tags: [Stations]
 *     responses:
 *       200:
 *         description: List of all stations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                     description: Name of the station
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /stations/{id}:
 *   get:
 *     summary: Get station by ID
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the station
 *     responses:
 *       200:
 *         description: Station found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Station not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /stations:
 *   post:
 *     summary: Create a new station
 *     tags: [Stations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the station
 *                 example: Central Station
 *               address:
 *                 type: string
 *                 description: Address of the station
 *                 example: 123 Main Street
 *               long:
 *                 type: number
 *                 description: Longitude of the station
 *                 example: -73.935242
 *               lat:
 *                 type: number
 *                 description: Latitude of the station
 *                 example: 40.73061
 *     responses:
 *       200:
 *         description: Station created successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /stations/{id}:
 *   put:
 *     summary: Update an existing station
 *     tags: [Stations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the station
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the station
 *                 example: Updated Central Station
 *               address:
 *                 type: string
 *                 description: Updated address of the station
 *                 example: 456 Elm Street
 *               long:
 *                 type: number
 *                 description: Updated longitude of the station
 *                 example: -73.935242
 *               lat:
 *                 type: number
 *                 description: Updated latitude of the station
 *                 example: 40.73061
 *     responses:
 *       200:
 *         description: Station updated successfully
 *       404:
 *         description: Station not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /stations/{id}:
 *   delete:
 *     summary: Delete a station
 *     tags: [Stations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the station
 *     responses:
 *       200:
 *         description: Station deleted successfully
 *       404:
 *         description: Station not found
 *       500:
 *         description: Internal Server Error
 */
