const express = require('express');
const { postPlaces, getPlaces, getEachPlace, getAllPlaces } = require('../controllers/placesController');
const router = express.Router()

router.post('/places',postPlaces)
router.get('/places',getPlaces)
router.get('/allPlaces',getAllPlaces)
router.get('/places/:id',getEachPlace)

module.exports = router;