const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        default: "user",
    },
    googleId: {
        type: String,
    },
})

module.exports = mongoose.model('User',UserSchema)