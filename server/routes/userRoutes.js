const express = require('express');
const { registerUser, loginUser, userProfile, logoutUser, uploadByLink } = require('../controllers/userController');
const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',userProfile)
router.post('/logout',logoutUser)

module.exports = router