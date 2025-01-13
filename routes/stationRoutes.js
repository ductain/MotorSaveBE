const {
  getStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");

const router = require("express").Router();

router.get("/", getStations);
router.get("/:id", getStationById);
router.post("/", createStation);
router.put("/:id", updateStation);
router.delete("/:id", deleteStation);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: APIIIIII for managinggggggggggggggggggggggggggg stations
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
 *               longtitude:
 *                 type: number
 *                 description: Longitude of the station
 *                 example: -73.935242
 *               latitude:
 *                 type: number
 *                 description: Latitude of the station
 *                 example: 40.73061
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *                 description: Creation date of the station
 *                 example: 2025-01-01T12:00:00Z
 *               updatedDate:
 *                 type: string
 *                 format: date-time
 *                 description: Last updated date of the station
 *                 example: 2025-01-10T12:00:00Z
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
 *               longtitude:
 *                 type: number
 *                 description: Updated longitude of the station
 *                 example: -73.935242
 *               latitude:
 *                 type: number
 *                 description: Updated latitude of the station
 *                 example: 40.73061
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *                 description: Updated creation date of the station
 *                 example: 2025-01-01T12:00:00Z
 *               updatedDate:
 *                 type: string
 *                 format: date-time
 *                 description: Last updated date of the station
 *                 example: 2025-01-12T12:00:00Z
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
