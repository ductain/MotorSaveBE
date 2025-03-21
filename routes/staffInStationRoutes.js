const { verifyToken } = require("../config/verify");

const {
    getAll,
    getStaffsInAStation,
    addStaffIntoStation,
    updateStationOfAStaff,
    getStationOfAStaff,
} = require("../controllers/staffInStationController");

const router = require("express").Router();

router.get("/", getAll);
router.get("/:stationId", getStaffsInAStation);
router.get("/station/staff", verifyToken, getStationOfAStaff);
router.post("/", addStaffIntoStation);
router.put("/:staffId/station", updateStationOfAStaff);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: StaffInStation
 *   description: API for managing staff in stations
 */

/**
 * @swagger
 * /staffinstations:
 *   get:
 *     summary: Get all staff in stations
 *     tags: [StaffInStation]
 *     responses:
 *       200:
 *         description: List of all staff in stations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   staffId:
 *                     type: string
 *                   stationId:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /staffinstations/{stationId}:
 *   get:
 *     summary: Get staffs in a specific station
 *     tags: [StaffInStation]
 *     parameters:
 *       - in: path
 *         name: stationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the station
 *     responses:
 *       200:
 *         description: Staff in the station
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   staffId:
 *                     type: string
 *                   stationId:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /staffinstations/station/staff:
 *   get:
 *     summary: Get the station of the staff
 *     tags: [StaffInStation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Staff in the station
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /staffinstations/:
 *   post:
 *     summary: Add a staff to a station
 *     tags: [StaffInStation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               staffId:
 *                 type: string
 *                 description: ID of the staff
 *               stationId:
 *                 type: string
 *                 description: ID of the station
 *     responses:
 *       200:
 *         description: Staff added to the station
 *       401:
 *         description: Staff already exists in another station
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /staffinstations/{staffId}/station:
 *   put:
 *     summary: Update the station of a staff member
 *     tags: [StaffInStation]
 *     parameters:
 *       - in: path
 *         name: staffId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the staff
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stationId:
 *                 type: string
 *                 description: New station ID for the staff
 *     responses:
 *       200:
 *         description: Staff station updated successfully
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Internal Server Error
 */

