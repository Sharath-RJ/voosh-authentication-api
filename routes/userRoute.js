const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth= require("../middleware/auth")
const upload=require("../middleware/multer")

router.get('/getProfile',auth, userController.getProfile);

router.put('/updateProfile',auth,upload.single('profile-picture'), userController.updateProfile);

router.get("/allUsers", auth, userController.listPublicProfiles)

