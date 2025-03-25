const { verifyToken, verifyAdmin } = require("../config/verify");
const accountController = require("../controllers/accountController");

const router = require("express").Router();

router.post("/register", accountController.register);
router.post("/login", accountController.login);
router.get("/profile", verifyToken, accountController.getProfileById);
router.put("/profile", verifyToken, accountController.updateAccountProfile);

router.get("/staffs", verifyAdmin, accountController.getStaffList);
router.post("/staffs", verifyAdmin, accountController.registerStaffAccount);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Auth managing API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: register
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      description: Input username, password, fullName, phone
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *                      fullName:
 *                          type: string
 *                      phone:
 *                          type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       404:
 *         description: Username hoặc phone đã tồn tại.
 *       400:
 *         description: Password phải có ít nhất 6 ký tự.
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      description: Input identifier, pasword (identifier is username or phone)
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      identifier:
 *                          type: string
 *                      password:
 *                          type: string
 *     responses:
 *       201:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai username/phone hoặc password
 *       400:
 *         description: Cần Username/Phone và password.
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Returns the user profile
 *     tags: [Auth]
 *     security:
 *          - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user profile
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: Update account profile
 *     description: Updates the user's profile information. All fields are required.
 *     tags: [Auth]
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "John@gmail.com"
 *               gender:
 *                 type: boolean
 *                 enum: ["Nam", "Nữ", "Khác"]
 *                 example: "Nam"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-15"
 *               address:
 *                 type: string
 *                 example: "123 Main St, New York, NY"
 *               licenseplate:
 *                 type: string
 *                 example: "ABC-1234"
 *               avatar:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/avatar.jpg"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *       400:
 *         description: Bad request (Missing fields or invalid format)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All fields are required"
 *       404:
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Account not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /auth/staffs:
 *   get:
 *     summary: Returns the staff list
 *     tags: [Auth]
 *     security:
 *          - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of all staffs
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /auth/staffs:
 *   post:
 *     summary: register
 *     tags: [Auth]
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *      required: true
 *      description: Input username, password, fullName, phone and roleId
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *                      fullName:
 *                          type: string
 *                      phone:
 *                          type: string
 *                      roleId:
 *                          type: number
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       404:
 *         description: Username hoặc phone đã tồn tại.
 *       400:
 *         description: Password phải có ít nhất 6 ký tự.
 *       500:
 *         description: Internal Server Error
 */
module.exports = router;
