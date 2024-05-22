
const { google } = require("google-auth-library")

const CLIENT_ID = "your_client_id"
const CLIENT_SECRET = "your_client_secret"
const REDIRECT_URI = "http://localhost:3000/google/callback" 

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

module.exports = oAuth2Client
