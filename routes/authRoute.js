const express = require('express');
const router = express.Router();
const authConteoller = require('../controllers/authController');

router.post('/register',authConteoller.userRegister);

router.post("/login",authConteoller.userLogin);

module.exports = router