const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    admin:{
        type:Boolean,
        required:true
    },
    password:{
        type: String
    },
    photo:{
        type: String,
    }

})

const userModel = mongoose.model('user',userSchema)
 module.exports = userModel;