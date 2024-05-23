const userModel = require("../models/userModel")


const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password") //avoid showing password in response for security purpose
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProfile = async (req, res) => {
    const { name, bio, phone, email, isPublic } = req.body
    const updatedFields = { name, bio, phone, email, isPublic }
    if (req.file) updatedFields.profilePicture = req.file.path

    try {
        const user = await userModel
            .findByIdAndUpdate(
                req.user.id,
                { $set: updatedFields },
                { new: true }
            )
            .select("-password") 

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

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


const listAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password")
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

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
