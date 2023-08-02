const express = require('express');
const { makeBooking, getBooking, deleteBooking, deleteOrder } = require('../controllers/bookingController');
const app  = express();
const router = express.Router()

router.post('/bookings',makeBooking)
router.get('/bookings',getBooking)
router.delete('/deleteBooking/:id',deleteBooking)
router.delete('/deleteOrder/:id',deleteOrder)

module.exports =  router;