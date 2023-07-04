const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const { configDotenv } = require('dotenv');
configDotenv();
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser');
const app = express()
const download = require('image-downloader');


// Middleware
app.use(cookieParser())
app.use(express.json())
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

//download image from link and save it to uploads folder using npm package "image-downloader'

 app.post('/uploadByLink',async( req,res )=>{
    const {link} = req.body;
    const newName = 'photo'+ Date.now() + '.jpg';
   await download.image({
        url:link,
        dest: __dirname + '/uploads',
    })
    res.json(__dirname + '/uploads' + newName)
    }) 