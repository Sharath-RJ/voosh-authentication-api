const jwt = require("jsonwebtoken")
const dotenv= require("dotenv")
dotenv.config()

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization")
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized user" })
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized user" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized user" })
    }
}

module.exports = auth
