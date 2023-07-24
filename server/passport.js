const passport = require('passport');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const  jwt  = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
app.use(cookieParser())

// const FacebookStrategy = require('passport-facebook').Strategy;

// Google
const GOOGLE_CLIENT_ID = '189603413224-v2asu2r2onph2aer3c9l5kqfnemop424.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// GitHub 
const GITHUB_CLIENT_ID = '263c7a8a5a758db87e78';
const GITHUB_CLIENT_SECRET = 'e0e50b88299eef50f97ac8990747715836e1f2ad';

// Facebook
// const FACEBOOK_APP_ID='';
// const FACEBOOK_APP_SECRET ='';


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
  },
  async function(req,accessToken, refreshToken, profile, done){
    //   Check If user exists
    try{
       let existingUser =  await userModel.findOne({email:profile.emails[0].value},)
       if(existingUser){
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SECRET);
        req.res.cookie('token',token);
        console.log(existingUser)
          return done(null,existingUser)
       }
       if(!existingUser){
          const newUser = new userModel({
              name: profile.displayName,
              email: profile.emails[0].value,
              photo: profile.photos[0].value,
          });
          existingUser = await newUser.save();
          // Generate the JWT token with the user data
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id,photo: existingUser.photo}, process.env.SECRET);
        // Set the token as a cookie in the response
        req.res.cookie('token', token);
        // Respond with the existing user data as JSON
        return done(null, existingUser);
       }
    }catch(err){
        return done(err)
    }
    
  }
));

passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    passReqToCallback: true

  },
  async function(req,accessToken, refreshToken, profile, done){
    //   Check If user exists
    try{
        let existingUser =  await userModel.findOne({email:profile.emails[0].value},)
        if(existingUser){
         const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SECRET);
         req.res.cookie('token',token);
         console.log(existingUser)
           return done(null,existingUser)
        }
        if(!existingUser){
           const newUser = new userModel({
               name: profile.displayName,
               email: profile.emails[0].value,
               photo: profile.photos[0].value,
           });
           existingUser = await newUser.save();
           // Generate the JWT token with the user data
         const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET);
         // Set the token as a cookie in the response
         req.res.cookie('token', token);
         // Respond with the existing user data as JSON
         return done(null, existingUser);
        }
     }catch(err){
         return done(err)
     }
  }
));

passport.serializeUser((user,done)=>{
      done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})