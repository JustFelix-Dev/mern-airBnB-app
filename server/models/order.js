const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    paymentIntentId:{
        type: String,
        required: true
    },
    details:[{
        numOfGuests:{
            type: Number,
        },
        checkIn:{
            type:String,
        },
        checkOut:{
            type: String,
        },
        fullName:{
            type: String,
        },
        mobile:{
            type: String,
        },
        price:{
            type: Number,
            required: true
        },
    }
    ],
    email:{
        type: String,
    },
    payment_status:{
        type: String,
        required: true,
    },
    customerId:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    }

},{timestamps: true});

const Order = mongoose.model('order',orderSchema);

module.exports = Order;