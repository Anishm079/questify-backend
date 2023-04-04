const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const getUser=async (req,res) =>{
    const {firstname,lastname,email,password,profession}=req.body;
    if(!email){
        return res.status(400).json({error: "Please fill in all fields"});
    }
    try{
        
        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(404).json({error:"User does not exist"})
        }

        const pwdVerify= await bcrypt.compare(password,findUser.password);

        if(!pwdVerify)
            return res.status(409).json({error:"Enter valid credentials"})

        const token = jwt.sign({ userId: findUser._id },process.env.COMPANY_SECRETE,{expiresIn:"30s"});
        const refreshToken= jwt.sign({ userId: findUser._id },process.env.COMPANY_SECRETE,{expiresIn:"1d"});
        
        res.cookie('jwt',refreshToken,{
            httpOnly:true,
            sameSite:'None',     // to allow frontEnd(Cross Platform) also in the same domain
            secore:true, 
            maxAge:24*60*60*1000 //here expiry time is in mili seconds (1000ms ~ 1s)
        })
        return res.status(201).json({token});
        
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getUser;