const express = require('express');
const { postPlaces, getPlaces } = require('../controllers/placesController');
const router = express.Router()

router.post('/places',postPlaces)
router.get('/places',getPlaces)

module.exports = router;