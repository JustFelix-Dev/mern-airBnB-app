const express = require('express');
const { registerUser, loginUser, userProfile } = require('../controllers/userController');
const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',userProfile)

module.exports = router