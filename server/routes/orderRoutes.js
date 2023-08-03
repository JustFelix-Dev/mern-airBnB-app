const express = require('express');
const { getBookedOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router()

router.get('/getOrder/:id',getBookedOrder)
router.delete('/deleteOrder/:id',deleteOrder)




module.exports = router