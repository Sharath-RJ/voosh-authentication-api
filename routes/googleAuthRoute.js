router.get("/google", (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
    res.redirect(authUrl)
})

router.get("/google/callback", async (req, res) => {
    const { code } = req.query
    try {
        const { tokens } = await oAuth2Client.getToken(code)
        oAuth2Client.setCredentials(tokens)
        const userInfo = await google
            .oauth2("v2")
            .userinfo.get({ auth: oAuth2Client })
        // Process user information and create user account or authenticate user
        res.json(userInfo.data)
    } catch (error) {
        console.error("Error retrieving access token:", error)
        res.status(500).json({ error: "Failed to authenticate with Google" })
    }
})
