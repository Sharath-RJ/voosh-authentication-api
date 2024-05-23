const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth= require("../middleware/auth")
const upload=require("../middleware/multer");
const isAdmin = require('../middleware/admin');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         bio:
 *           type: string
 *         phone:
 *           type: string
 *         profilePhoto:
 *           type: string
 *         isPublic:
 *           type: boolean
 *         role:
 *           type: string
 *           default: user
 */

/**
 * @swagger
 * /api/users/getProfile:
 *   get:
 *     summary: Get the profile of the logged-in user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.get('/getProfile',auth, userController.getProfile);

/**
 * @swagger
 * /api/users/updateProfile:
 *   put:
 *     summary: Update the profile of the logged-in user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *               profile-picture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized user
 *       500:
 *         description: Server error
 */

router.put('/updateProfile',auth,upload.single('profile-picture'), userController.updateProfile);

/**
 * @swagger
 * /api/users/allPublicUsers:
 *   get:
 *     summary: Get a list of all public user profiles
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of public user profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */

router.get("/allPublicUsers", auth, userController.listPublicProfiles)
/**
 * @swagger
 * /api/users/allUsers:
 *   get:
 *     summary: Get a list of all user profiles (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all user profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */

router.get("/allUsers", isAdmin, userController.listAllUsers)

/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: Logout the user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout successful
 */

router.get("/logout",auth, userController.logoutUser)
/**
 * @swagger
 * /api/users/updatePassword:
 *   put:
 *     summary: Update user password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: All fields are required
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */



router.put("/updatePassword",auth, userController.updatePassword)

module.exports = router

