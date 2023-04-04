const jwt = require('jsonwebtoken');
require("dotenv").config();

const refreshJwt=async (req,res)=>{

    const cookies=req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401); //401->stands for ___      //optional chaining if not (cookies then .pwd)  
    const refreshToken = cookies.jwt;

    if(!refreshToken) return res.status(403).json({error:"unauthorized"});

    const decoded = jwt.verify(refreshToken,process.env.COMPANY_SECRETE);

    const userId=decoded.userId;

    const encoded=jwt.sign({userId},process.env.COMPANY_SECRETE,{expiresIn:"10000s"});

    return res.status(201).json({token:encoded})

}

module.exports=refreshJwt