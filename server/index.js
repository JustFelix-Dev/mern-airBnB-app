const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const { configDotenv } = require('dotenv');
configDotenv();
const userRoutes = require('./routes/userRoutes');
const placesRoutes = require('./routes/placesRoutes');
const cookieParser = require('cookie-parser');
const app = express()
const download = require('image-downloader');
const multer = require('multer');
const fs = require('fs');


// Middleware
app.use(cookieParser())
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cors({
    credentials: true,
       origin:'http://localhost:5173'
    }))

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