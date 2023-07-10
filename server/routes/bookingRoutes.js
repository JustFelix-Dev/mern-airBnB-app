const express = require('express');
const { makeBooking, getBooking } = require('../controllers/bookingController');
const app  = express();
const router = express.Router()

router.post('/bookings',makeBooking)
router.get('/bookings',getBooking)

module.exports =  router;