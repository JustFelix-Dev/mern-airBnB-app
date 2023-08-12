const express = require('express');
const { registerUser, loginUser, userProfile, logoutUser, findUser } = require('../controllers/userController');
const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',userProfile)
router.post('/logout',logoutUser)
router.get('/find/:userId',findUser)

module.exports = router