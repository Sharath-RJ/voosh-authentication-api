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
            const user = await User.findByIdAndUpdate(
                req.user.id,
                { $set: updatedFields },
                { new: true }
            )
            res.json(user)
        } catch (err) {
            res.status(500).json({message:err.message})
        }
   
}

module.exports = { getProfile, updateProfile }
