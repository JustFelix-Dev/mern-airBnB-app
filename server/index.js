const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const { configDotenv } = require('dotenv');
configDotenv();
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const placesRoutes = require('./routes/placesRoutes');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const download = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const session = require('express-session');
const passportsetUp = require('./passport');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const userModel = require('./models/user');


// Middleware
app.use(cookieParser())
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/userPhoto',express.static(__dirname+'/userPhoto'))
app.set('view engine','ejs')
app.use(cors({
    credentials: true,
       origin:'http://localhost:5173'
    }))

// Social Auth
    app.use(session({
        secret: 'felix',
        resave: false,
        saveUninitialized: false,
   }))
   
   app.use(passport.initialize());
   app.use(passport.session());

// Connect to Db
mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(process.env.PORT,(req,res)=>{
        console.log(`--Listening to Port,${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err.message)
})

app.use(userRoutes)
app.use(placesRoutes)
app.use(bookingRoutes)
app.use('/auth',authRoutes)


// app.get('/test',(req,res)=>{
//     res.json("Hello World!")
// })
//download image from link and save it to uploads folder using npm package "image-downloader';
 app.post('/uploadByLink',async( req,res )=>{
    const {link} = req.body;
    const newName = 'photo'+ Date.now() + '.jpg';
   await download.image({
        url:link,
        dest: __dirname + '/uploads/' +newName,
    })
    res.json(newName)
    }) 

    const photosMiddleware = multer({dest:'uploads/'});
    const photoMiddleware = multer({dest:'userPhoto/'});

    app.post('/userPhoto',photoMiddleware.single('photo'),(req,res)=>{
        const { path, originalname } = req.file;
        console.log(req.file);
      
        const parts = originalname.split('.');
        const format = parts[parts.length - 1];
        const newPath = path + '.' + format;
        fs.renameSync(path, newPath);
        const uploadedFile = newPath.replace('userPhoto', '');
        console.log(uploadedFile);
        res.json({ photo: uploadedFile });
        })

app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
        const uploadedFiles = [];

      for(let i = 0; i < req.files.length; i++){
          const {path,originalname} = req.files[i];
          console.log(req.files)
          const parts = originalname.split('.');
          const format = parts[parts.length - 1];
          const newPath = path + '.' + format;
          fs.renameSync(path, newPath);
          console.log(newPath)
          uploadedFiles.push(newPath.replace("uploads",''))
          console.log(uploadedFiles)
      }
        res.json(uploadedFiles)
})

app.post('/forgotPassword',async(req,res)=>{
    const {email} = req.body;
    try{
        const existingUser = await userModel.findOne({email}) 
        if(!existingUser){
            console.log('Email does not exist!')
           return res.status(401).json('Email does not exist!')
        }
        if(!existingUser.password){
            console.log('You have a social Auth registration!')
            res.status(401).json('You have a social Auth registration!')
        }
        const SECRET = process.env.SECRET;
        const secret = SECRET + existingUser?.password;
        const token = jwt.sign({email: existingUser.email,id:existingUser._id},secret,{expiresIn:'10m'});
        const link = `http://localhost:8000/reset-password/${existingUser._id}/${token}`;
        console.log(link)
        //send email with the reset password url to the registered mail id

      }catch(err){

      }
})

app.get('/reset-password/:id/:token',async( req,res )=>{
          const {id,token} = req.params;
          console.log(req.params)
         const existingUser = await userModel.findOne({_id: id});
         if(!existingUser){
            return res.status(401).json('User does not exist!');
         }
         const SECRET = process.env.SECRET;
         const secret = SECRET + existingUser?.password;
         try{
             const verify = jwt.verify(token,secret);
                res.render('index',{email:verify.email})
         }catch(error){
                res.send('Not Verified!')
         }
})

app.post('/reset-password/:id/:token',async( req,res )=>{
    const {id,token} = req.params;
    const { password,confirmPassword } = req.body;

   const existingUser = await userModel.findOne({_id: id});
   if(!existingUser){
      return res.status(401).json('User does not exist!');
   }
   const SECRET = process.env.SECRET;
   const secret = SECRET + existingUser?.password;
   try{
    const verify = jwt.verify(token,secret);
    const isMatched = bcrypt.compareSync(password, confirmPassword)
    if(isMatched){
    const hashedPassword=bcrypt.hashSync(password, 10);
    await userModel.updateOne({_id:id},{$set:{password: hashedPassword}})
    res.status(201).json('Password Updated successfully!')
    }else{
        res.status(401).json('Passwords do not match!')
    }

   }catch(error){
          res.send('Not Verified!');
   }
})