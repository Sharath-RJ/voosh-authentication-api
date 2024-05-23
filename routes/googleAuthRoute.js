const express = require("express")
const passport = require("passport")
const jwt = require("jsonwebtoken") // If you're using JWT for sessions
const router = express.Router()

/**
 * @swagger
 * /api/google:
 *   get:
 *     summary: Log in with Google
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google for authentication
 */
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

/**
 * @swagger
 * /api/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect based on authentication status
 */
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // If using JWT for session management
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })
        res.cookie("token", token, { httpOnly: true })

        // Successful authentication, redirect to a specified route
        res.redirect("/profile")
    }
)

module.exports = router
