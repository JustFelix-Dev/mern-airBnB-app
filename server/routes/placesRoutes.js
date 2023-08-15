const express = require('express');
const { postPlaces, getPlaces, getEachPlace, getAllPlaces, editPlace, deletePlace } = require('../controllers/placesController');
const router = express.Router()

router.post('/places',postPlaces)
router.get('/places',getPlaces)
router.get('/allPlaces',getAllPlaces)
router.get('/places/:id',getEachPlace)
router.put('/editPlace/:id',editPlace)
router.delete('/deletePlace/:id',deletePlace)

module.exports = router;