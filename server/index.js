const express = require('express');
const cors = require('cors');

const app = express()

app.get('/test',(req,res)=>{
    res.json('testing alright')
})

app.listen(8000)