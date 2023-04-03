const jwt = require('jsonwebtoken');

const refreshJwt=async (req,res)=>{

    const cookies=req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401); //401->stands for ___      //optional chaining if not (cookies then .pwd)  
    const refreshToken = cookies.jwt;

    if(!refreshToken) return res.status(403).json({error:"unauthorized"});

    const decoded = jwt.verify(refreshToken, "companySecretCode");

    const userId=decoded.userId;

    const encoded=jwt.sign({userId},"companySecretCode",{expiresIn:"10000s"});

    return res.status(201).json({token:encoded})

}

module.exports=refreshJwt