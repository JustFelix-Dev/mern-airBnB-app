const express = require('express');
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
      user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      place: {
        type: mongoose.Schema.Types.ObjectId, 
        required:true
      },
      numOfGuests:{
        type:Number,
        required: true,
      },
      checkIn:{
        type: Date,
        required: true,
      },
      checkOut:{
        type: Date,
        required: true,
      },
      fullName:{
        type:String,
        required: true
      },
      mobile:{
        type:String,
        required: true
      },
      price:{
        type:Number,
        required: true
      }
})

const bookingModel =  mongoose.model("booking",BookingSchema);
module.exports = bookingModel;