const express = require('express');
const cors = require('cors');

const app = express()
app.use(cors({
    credentials: true,
       origin:'http://localhost:5173'
    }))

app.get('/test',(req,res)=>{
    res.json('testing alright')
})

app.listen(8000,(req,res)=>{
    console.log('--Listening to Port 8000')
})