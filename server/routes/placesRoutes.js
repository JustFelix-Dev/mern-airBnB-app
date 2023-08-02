const express = require('express');
const { postPlaces, getPlaces, getEachPlace, getAllPlaces, editPlace } = require('../controllers/placesController');
const router = express.Router()

router.post('/places',postPlaces)
router.get('/places',getPlaces)
router.get('/allPlaces',getAllPlaces)
router.get('/places/:id',getEachPlace)
router.put('/editPlace/:id',editPlace)

module.exports = router;