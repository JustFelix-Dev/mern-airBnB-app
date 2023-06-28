const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const { configDotenv } = require('dotenv');

const app = express()

// Connect to Db
mongoose.connect(process.env.MONGOURL);
app.use(express.json())
app.use(cors({
    credentials: true,
       origin:'http://localhost:5173'
    }))

app.post('/register',(req,res)=>{
    const { name,email,password } = req.body;
      res.json({ name,email,password });
})

app.listen(8000,(req,res)=>{
    console.log('--Listening to Port 8000')
})