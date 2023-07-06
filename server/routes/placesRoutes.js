const express = require('express');
const { postPlaces, getPlaces, getEachPlace } = require('../controllers/placesController');
const router = express.Router()

router.post('/places',postPlaces)
router.get('/places',getPlaces)
router.get('/places/:id',getEachPlace)

module.exports = router;