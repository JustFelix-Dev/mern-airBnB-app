const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Location = require('../models/Locations');
const app = express();

// Middleware
app.use(cookieParser())

const postPlaces = async(req,res)=>{

          const {token}= req.cookies;
          const { title,address,photos,
            photoLink,description,perks,
            extraInfo,checkIn,checkOut,maxGuests} = req.body;
          jwt.verify(token,process.env.SECRET,{},async(err,user)=>{
            if(err) throw err;
            const placeDoc = await Location.create({
                        owner: user.id,
                        title,address,photos,
                        photoLink,description,perks,
                        extraInfo,checkIn,checkOut,guests:maxGuests
               })
               res.json(placeDoc)
          })
}

 const getPlaces =async(req,res)=>{
    const {token}= req.cookies;
    jwt.verify(token,process.env.SECRET,{},async(err,user)=>{
        if(err) throw err;
             const {id} = user;
             const places = await Location.find({owner:id})
             res.json(places)
           })
}


module.exports = { postPlaces, getPlaces };