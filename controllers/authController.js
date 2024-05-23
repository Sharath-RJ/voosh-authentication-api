const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 *         phone:
 *           type: string
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User Registered Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: All fields are required
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
const userRegister = async (req, res) => {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
        })

        res.status(201).json({ message: "User Registered Successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: All fields are required
 *       404:
 *         description: User not found
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
const userLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const existingUser = await userModel.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        )
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            "test",
            { expiresIn: "1h" }
        )
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { userRegister, userLogin }
