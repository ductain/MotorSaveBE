const { verifyToken } = require("../config/verify");
const accountController = require("../controllers/accountController");

const router = require("express").Router();

router.post("/register", accountController.register);
router.post("/login", accountController.login);
router.get("/profile", verifyToken, accountController.getProfileById);
router.post("/forgot-password/send-otp", accountController.sendOtp);
router.post("/forgot-password/verify-otp", accountController.verifyOtp);
router.post("/forgot-password/reset-password", accountController.resetPassword);
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
 *                      email:
 *                          type: string
 *                      fullName:
 *                          type: string
 *                      phone:
 *                          type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       404:
 *         description: Username hoặc phone hoặc email đã tồn tại.
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
 * /auth/forgot-password/send-otp:
 *   post:
 *     summary: send an otp with a valid email
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      description: Input email
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *     responses:
 *       200:
 *         description: OTP gửi thành công!
 *       404:
 *         description: Không tìm thấy email!
 */

/**
 * @swagger
 * /auth/forgot-password/verify-otp:
 *   post:
 *     summary: verify otp
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      description: Input email and otp
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      otp:
 *                          type: string
 *     responses:
 *       200:
 *         description: Xác thực OTP thành công!
 *       404:
 *         description: Không tìm thấy email!
 *       400:
 *         description: OTP không hợp lệ hoặc hết hạn!
 */

/**
 * @swagger
 * /auth/forgot-password/reset-password:
 *   post:
 *     summary: reset password after verifying otp
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      description: Input email and new password
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      newPassword:
 *                          type: string
 *     responses:
 *       200:
 *         description: Cập nhật password thành công!
 *       400:
 *         description: Password phải có ít nhất 6 ký tự!
 */

module.exports = router;
