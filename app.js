// app.js
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const authRoutes = require("./routes/authRoute")
const userRoutes = require("./routes/userRoute")
const googleAuthRoute = require("./routes/googleAuthRoute")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

dotenv.config()

const app = express()

// Connnecting to MongoDB database
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log("Unable to connect to MongoDB", error)
    })

// Using middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Initialize Passport.js
app.use(passport.initialize())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/google", googleAuthRoute) // Add Google authentication route

// Configure Google OAuth strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `http://localhost:${process.env.PORT}/api/google/google/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("Google profile:", profile)
            return done(null, profile)
        }
    )
)

// Server configuration
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
