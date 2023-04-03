const allowedOrigins=require('../config/allowedOrigins');

const credentials = (req,res,next) => {
    
    const origin = req.headers.origin;
    if(!origin) return res.status(403).json({error:"not allowed"})

    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Credentials',true)
    }
    next();
}

module.exports = credentials;