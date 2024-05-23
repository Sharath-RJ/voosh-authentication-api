const userModel = require("../models/userModel")

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
const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password") //avoid showing password in response for security purpose
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/**
 * @swagger
 * /api/users/updateProfile:
 *   put:
 *     summary: Update the profile of the logged-in user
 *     tags: [Users]
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
 *       500:
 *         description: Server error
 */
const updateProfile = async (req, res) => {
    const { name, bio, phone, email, isPublic } = req.body
    const updatedFields = { name, bio, phone, email, isPublic }
    if (req.file) updatedFields.profilePicture = req.file.path

    try {
        const user = await userModel.findByIdAndUpdate(
            req.user.id,
            { $set: updatedFields },
            { new: true }
        )
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

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
const listPublicProfiles = async (req, res) => {
    try {
        const users = await userModel
            .find({ isPublic: true })
            .select("-password")
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

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
const listAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password")
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

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
const logoutUser = async (req, res) => {
    res.status(200).json({ message: "Logout successful" })
}

module.exports = {
    getProfile,
    updateProfile,
    listPublicProfiles,
    logoutUser,
    listAllUsers,
}
