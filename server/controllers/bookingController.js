const bookingModel = require("../models/Booking");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const makeBooking = (req,res)=>{
    const {token} = req.cookies;
    const {
        place,checkIn,
        checkOut,numOfGuests,
        fullName,mobile,price
          } = req.body;
          jwt.verify(token,process.env.SECRET,{},(err,user)=>{
            if(err) throw err;
            const bookingDoc = bookingModel.create({
                place,checkIn,
                checkOut,numOfGuests,
                fullName,mobile,price,user:user.id
            })
             .then((doc)=>{
                res.status(201).json(doc)
            })
            .catch((err)=>{
                console.log({"error":err.message})
            })
          })
}

const getBooking =async(req,res)=>{
    const {token}= req.cookies;
    jwt.verify(token,process.env.SECRET,{},async(err,user)=>{
        if(err) throw err;
             const {id} = user;
             const bookings = await bookingModel.find({user:id})
             res.json(bookings) 
           })
}

module.exports = { makeBooking,getBooking}