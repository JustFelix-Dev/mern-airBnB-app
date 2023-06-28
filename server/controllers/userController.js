const userModel = require('../models/user');
const bcrypt = require('bcrypt');

 const registerUser = async(req,res)=>{
    try{
        const { name,email,password } = req.body;
         const bcryptSalt  = bcrypt.genSaltSync()
        const user = await userModel.create({name,email,password:bcrypt.hashSync(password,bcryptSalt)})
       res.json(user);
    }
    catch(err){
        res.status(422).json(err)
    }
}

const loginUser = async(req,res)=>{
    try{
         const { email,password } = req.body;
    }
    catch(err){
        res.status(422).json(err)
    }
}
module.exports={registerUser};