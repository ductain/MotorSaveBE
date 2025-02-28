const { verifyToken } = require("../config/verify");
const accountController = require("../controllers/accountController");

const router = require("express").Router();

router.post("/register", accountController.register);
router.post("/login", accountController.login);
router.get("/profile", verifyToken, accountController.getProfileById);

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


module.exports = router;
