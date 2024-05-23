const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth= require("../middleware/auth")
const upload=require("../middleware/multer");
const isAdmin = require('../middleware/admin');

router.get('/getProfile',auth, userController.getProfile);

router.put('/updateProfile',auth,upload.single('profile-picture'), userController.updateProfile);

router.get("/allPublicUsers", auth, userController.listPublicProfiles)

router.get("/allUsers", isAdmin, userController.listAllUsers)

router.get("/logout",auth, userController.logoutUser)

module.exports = router

