const express = require('express');
const { places } = require('../controllers/placesController');
const router = express.Router()

router.post('/places',places)

module.exports = router;