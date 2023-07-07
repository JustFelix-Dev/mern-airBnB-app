const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    owner:
        {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: {
        type: String,
    },
    address:{
        type: String,
    },
    photos:{
        type:[String],
    },
    description:{
        type:String,
    },
    perks:{
        type:[String],
    },
    checkIn:{
        type:Number,
    },
    checkOut:{
        type:Number,
    },
    guests:{
        type:Number,
    },
    price:{
        type:Number,
    }
})

const Locationmodel = mongoose.model('location', locationSchema);

module.exports = Locationmodel;
