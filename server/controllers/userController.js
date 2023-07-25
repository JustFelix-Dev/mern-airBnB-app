const express = require('express');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { configDotenv } = require('dotenv');
configDotenv();
const app = express();

// Middleware
app.use(cookieParser())

 const registerUser = async(req,res)=>{
    try{
        const { name,email,password,photo } = req.body;
         const bcryptSalt  = bcrypt.genSaltSync();
         const isAdmin = password.includes(process.env.KEY);

        const user = await userModel.create({name,email,admin:isAdmin,photo,password:bcrypt.hashSync(password,bcryptSalt)})
        res.json({user,message:'Registration Successful!'});
    }
    catch(err){
        res.status(422).json(err)
    }
}

const loginUser = async(req,res)=>{
    try{
         const { email,password } = req.body;
         const user = await userModel.findOne({email})
         if(user){
            const isMatched = bcrypt.compareSync(password, user.password)
            if(isMatched){
                  jwt.sign({email:user.email,id:user._id,photo:user.photo,admin:user.admin},process.env.SECRET,(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json(user)
                    console.log(user)
                  }) 
            }else{
                res.status(402).json('Wrong credentials!')
            }
         }else{
            res.status(401).json('User not found')
         }
    }
    catch(err){
        res.status(422).json(err)
    }
}

const userProfile =(req,res)=>{
      const  {token} = req.cookies;
      if(token){
          jwt.verify(token,process.env.SECRET,{},async(err,user)=>{
            if(err) throw err;
            const {name,email,_id,photo} = await userModel.findById(user.id)
            res.json({name,email,_id,photo})
          })
      }else{
           res.json(null)
      }
}

 const logoutUser = (req,res)=>{
      res.cookie('token','').json(true)
 }


module.exports={registerUser,loginUser,userProfile,logoutUser,};