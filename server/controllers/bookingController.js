const bookingModel = require("../models/Booking");

const makeBooking = (req,res)=>{
    const {
        place,checkIn,
        checkOut,numOfGuests,
        fullName,mobile,price
          } = req.body;

    bookingModel.create({
        place,checkIn,
        checkOut,numOfGuests,
        fullName,mobile,price
    })
    .then((doc)=>{
        res.status(201).json({"message":"booking created successfully","data": doc})
        
    })

      
}

module.exports = { makeBooking}