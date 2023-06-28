const userModel = require('../models/user');
const bcrypt = require('bcrypt');

 const registerUser = async(req,res)=>{
     const { name,email,password } = req.body;
      const bcryptSalt  = bcrypt.genSalt()
     const user = await userModel.create({name,email,password:bcrypt.hashSync(password,bcryptSalt)})
    res.json(user);
}
module.exports={registerUser};